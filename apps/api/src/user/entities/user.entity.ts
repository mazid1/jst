import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { GoogleUser } from './google-user.entity';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ nullable: true })
  @Exclude()
  public refreshTokenHash?: string;

  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: GoogleUser.name })
  googleUser: GoogleUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
