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

  create(googleUserDto: CreateGoogleUserDto) {
    const googleUser = new this.googleUserModel(googleUserDto);
    return googleUser.save();
  }
}
