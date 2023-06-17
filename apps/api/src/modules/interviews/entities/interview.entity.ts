import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type InterviewDocument = Interview & Document;

@Schema({
  timestamps: true,
})
export class Interview {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  title: string; // title of the interview. i.e. Phone Interview, 1st Engineer Interview, System Design Interview

  @Prop({ required: true })
  applicationId: string;

  @Prop()
  dateTime: Date; // date time when the interview will take place

  @Prop()
  venue: string; // online / company address, place where the interview will take place

  @Prop()
  joinLink: string; // for online interview join link

  @Prop()
  duration: string; // how long the interview will be. i.e. 45min, 1hour

  @Prop()
  description: string; // any description provided by the recruiter, copy-paste into this field

  @Prop()
  notes: string; // any personal notes fot the round
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
