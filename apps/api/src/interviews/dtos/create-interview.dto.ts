import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsDate()
  dateTime: Date;

  @IsOptional()
  @IsString()
  venue: string;

  @IsOptional()
  @IsUrl()
  joinLink: string;

  @IsOptional()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  notes: string;
}
