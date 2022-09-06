import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsUrl()
  picture: string;

  @IsString()
  @IsNotEmpty()
  googleUser: string;
}
