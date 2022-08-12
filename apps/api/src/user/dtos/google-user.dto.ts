import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
} from 'class-validator';

export class GoogleUserDto {
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  verified_email: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  given_name: string;

  @IsString()
  family_name: string;

  @IsString()
  picture: string;

  @IsString()
  locale: string;

  @IsNotEmptyObject()
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
