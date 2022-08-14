import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGoogleUserDto } from './dtos/create-google-user.dto';
import { GoogleUser } from './entities/google-user.entity';

@Injectable()
export class GoogleUserService {
  constructor(
    @InjectModel(GoogleUser.name)
    private readonly googleUserModel: Model<GoogleUser>
  ) {}

  async findOne(id: string) {
    const googleUser = await this.googleUserModel
      .findOne({ externalId: id })
      .exec();
    if (!googleUser) {
      throw new NotFoundException(
        `GoogleUser with externalId #${id} not found`
      );
    }
    return googleUser;
  }

  create(googleUserDto: CreateGoogleUserDto) {
    const googleUser = new this.googleUserModel(googleUserDto);
    return googleUser.save();
  }
}
