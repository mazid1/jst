import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  applicationId: string;

  @IsDate()
  @IsOptional()
  dateTime: Date;

  @IsString()
  @IsOptional()
  venue: string;

  @IsUrl()
  @IsOptional()
  joinLink: string;

  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  notes: string;
}
