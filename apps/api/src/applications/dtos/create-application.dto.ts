import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApplicationStatus } from '../enums/application-status.enum';
import { LinkDto } from './link.dto';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(ApplicationStatus)
  @IsNotEmpty()
  status: ApplicationStatus = ApplicationStatus.TODO;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LinkDto)
  source: LinkDto;

  @IsOptional()
  @IsDateString()
  appliedDate: Date;

  @IsOptional()
  @IsDateString()
  rejectedDate: Date;

  @IsOptional()
  @IsDateString()
  acceptedDate: Date;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsMongoId()
  organization: string;
}
