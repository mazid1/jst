import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema({
  timestamps: true,
})
export class Organization {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  location: string; // state, country etc.

  @Prop()
  minSalary: number; // min salary in usd

  @Prop()
  maxSalary: number; // max salary in usd

  @Prop()
  size: string; // i.e. 50-100

  @Prop()
  website: string; // website url

  @Prop()
  linkedinPage: string; // linkedin page url

  @Prop({ default: false })
  isDeleted: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
