import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Authorization & Document;

@Schema()
export class Authorization {
  @Prop()
  login: string;

  @Prop()
  password: string;
  @Prop()
  imageId: string
}

export const AuthSchema = SchemaFactory.createForClass(Authorization);
