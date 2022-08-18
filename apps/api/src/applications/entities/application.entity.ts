import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Organization } from '../../organizations/entities/organization.entity';
import { ApplicationStatus } from '../enums/application-status.enum';
import { Link } from '../interfaces/link.interface';

export type ApplicationDocument = Application & Document;

@Schema({
  timestamps: true,
})
export class Application {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  position: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    enum: ApplicationStatus,
    type: String,
    default: ApplicationStatus.TODO,
    index: true,
  })
  status: ApplicationStatus;

  @Prop()
  location: string;

  @Prop(
    raw({
      label: String,
      url: String,
    })
  )
  source: Link;

  @Prop()
  appliedDate: Date;

  @Prop()
  rejectedDate: Date;

  @Prop()
  acceptedDate: Date;

  @Prop()
  notes: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: Organization.name })
  @Type(() => Organization)
  organization: Organization;

  @Prop({ type: [mongoose.SchemaTypes.Mixed] })
  interviews: Record<string, any>[];
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
