import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UsersInRoom } from '../../../schemas/usersInRoom.schema';
import { Model } from 'mongoose';
import { Messages, MessagesDocument } from '../../../schemas/messages.schema';
import { RoomDocument, Rooms } from '../../../schemas/rooms.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(UsersInRoom.name) private readonly usersModel: Model<UserDocument>,
    @InjectModel(Messages.name) private readonly messagesModel: Model<MessagesDocument>,
    @InjectModel(Rooms.name) private readonly roomsModel: Model<RoomDocument>,
  ) {}

  async getAllMessages(room: string): Promise<Messages[]> {
    return this.messagesModel.find({ room });
  }

  async sendMessage(
    user: string,
    text: string,
    room: string,
    imageId: string
  ): Promise<Messages> {
    const newMessage = new this.messagesModel({ user, text, room, imageId });
    await this.roomsModel.updateOne({ room: room }, { $set: {lastMessage: text, user: user}});
    return newMessage.save();
  }

  async addUser(id: string, name: string, room: string): Promise<UsersInRoom> {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const candidate = await this.usersModel.find({name: name, room: room})
    if(candidate) {

    }
    const user = await new this.usersModel({ id, name, room }).save();
    return user.save();
  }

  async removeUser(id: string): Promise<UsersInRoom> {
    return this.usersModel.findByIdAndRemove(id);
  }

  async getUser(id: string): Promise<UsersInRoom> {
    return this.usersModel.findOne({id});
  }

  async getUsersInRoom(room: string): Promise<UsersInRoom[]> {
    return this.usersModel.find({ room });
  }

}
