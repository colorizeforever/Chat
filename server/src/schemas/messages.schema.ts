import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessagesDocument = Messages & Document;

@Schema()
export class Messages {
  @Prop()
  user: string;
  @Prop()
  text: string;
  @Prop()
  room: string;
  @Prop()
  imageId: string
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
