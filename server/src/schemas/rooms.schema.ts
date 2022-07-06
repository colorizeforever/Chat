import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";

export type RoomDocument = Rooms & Document;

@Schema()
export class Rooms {
  @Prop()
  room: string
  @Prop()
  lastMessage: string
  @Prop()
  user: string
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms)