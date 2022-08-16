import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGoogleUserDto } from './dtos/create-google-user.dto';
import { GoogleUser } from './entities/google-user.entity';

@Injectable()
export class GoogleUserService {
  private readonly logger = new Logger(GoogleUserService.name);

  constructor(
    @InjectModel(GoogleUser.name)
    private readonly googleUserModel: Model<GoogleUser>
  ) {}

  async findOneAndUpdateOrCreate(createGoogleUserDto: CreateGoogleUserDto) {
    let googleUser: GoogleUser;

    try {
      googleUser = await this.findOneByExternalId(
        createGoogleUserDto.externalId
      );
    } catch (error) {
      this.logger.log(`${error}, creating new one`);
      return await this.create(createGoogleUserDto);
    }

    this.logger.log(
      `Updating Google User externalId #${googleUser.externalId} with latest info`
    );
    return await this.googleUserModel.findByIdAndUpdate(
      googleUser.id,
      createGoogleUserDto
    );
  }

  async findOneByExternalId(externalId: string) {
    const googleUser = await this.googleUserModel
      .findOne({ externalId: externalId })
      .exec();
    if (!googleUser) {
      throw new NotFoundException(
        `GoogleUser with externalId #${externalId} not found`
      );
    }
    return googleUser;
  }

  async create(createGoogleUserDto: CreateGoogleUserDto) {
    const googleUser = new this.googleUserModel(createGoogleUserDto);
    return await googleUser.save();
  }
}
