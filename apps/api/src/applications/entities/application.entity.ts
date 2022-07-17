import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApplicationStatus } from '../enums/application-status.enum';
import { Link } from '../interfaces/link.interface';

@Schema({
  timestamps: true,
})
export class Application extends Document {
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

  @Prop({ type: mongoose.SchemaTypes.Mixed })
  company: Record<string, any>;

  @Prop({ type: [mongoose.SchemaTypes.Mixed] })
  interviews: Record<string, any>[];
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
