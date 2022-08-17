import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { Credentials } from 'google-auth-library';

export class CreateGoogleUserDto {
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  picture: string;

  @IsNotEmptyObject()
  tokens: Credentials;
}
