import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class GoogleUser extends Document {
  @Prop({ required: true })
  externalId: string; // map with "id" field from google

  @Prop({ required: true })
  email: string;

  @Prop()
  verified_email: boolean;

  @Prop({ required: true })
  name: string;

  @Prop()
  given_name: string;

  @Prop()
  family_name: string;

  @Prop()
  picture: string;

  @Prop()
  locale: string;

  @Prop(
    raw({
      access_token: { type: String, required: true },
      refresh_token: { type: String, required: true },
    })
  )
  tokens: Record<string, string>;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);
