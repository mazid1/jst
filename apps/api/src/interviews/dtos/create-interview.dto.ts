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
  applicationId: string;

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
