import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UsersInRoom & Document;

@Schema()
export class UsersInRoom {
  @Prop()
  id: string
  @Prop()
  name: string
  @Prop()
  room: string
  @Prop()
  imageId: string

}

export const UsersInRoomSchema = SchemaFactory.createForClass(UsersInRoom);
