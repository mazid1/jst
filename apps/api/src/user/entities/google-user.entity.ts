import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Credentials } from 'google-auth-library';

@Schema({
  timestamps: true,
})
export class GoogleUser extends Document {
  @Prop({ required: true, unique: true })
  externalId: string; // map with "id" field from google

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  picture: string;

  @Prop(
    raw({
      access_token: { type: String, required: true },
      refresh_token: { type: String, required: true },
      token_type: { type: String },
      expiry_date: { type: Number },
      id_token: { type: String },
      scope: { type: String },
    })
  )
  tokens: Credentials;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);
