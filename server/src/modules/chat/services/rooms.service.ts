import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {RoomDocument, Rooms} from "../../../schemas/rooms.schema";
import {Model} from "mongoose";

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Rooms.name) private roomsModel: Model<RoomDocument>,
        )  { }

   async getAllRooms(): Promise<Rooms[]> {
       return this.roomsModel.find();
   };

  async createRoom(room: string): Promise<RoomDocument> {
    return await new this.roomsModel({room}).save()
  }
}
