import { IsOptional, IsString, IsUrl } from 'class-validator';

export class LinkDto {
  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsUrl()
  url: string;
}
