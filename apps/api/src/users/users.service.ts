import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User ID #${id} not found`);
    return user;
  }

  async findOneOrCreate(createUserDto: CreateUserDto) {
    try {
      return await this.findOneByGoogleUserId(createUserDto.googleUser);
    } catch (error) {
      this.logger.log(`${error}, creating new one`);
      return await this.create(createUserDto);
    }
  }

  async findOneByGoogleUserId(googleUserId: string) {
    const user = await this.userModel
      .findOne({ googleUser: googleUserId }, '-googleUser')
      .exec();

    if (!user) {
      throw new NotFoundException(`User externalId #${googleUserId} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.userModel
      .findByIdAndUpdate(
        id,
        {
          refreshTokenHash,
        },
        { new: true }
      )
      .exec();
  }

  async removeRefreshToken(userId: string) {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          refreshTokenHash: null,
        },
        { new: true }
      )
      .exec();
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.findById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
