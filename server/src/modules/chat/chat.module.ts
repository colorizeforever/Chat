import { Module } from "@nestjs/common";
import { ChatService } from "./services/chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersInRoom, UsersInRoomSchema } from "../../schemas/usersInRoom.schema";
import { Messages, MessagesSchema } from "../../schemas/messages.schema";
import { ChatGateway } from "./gateway/chat.gateway";
import { JwtModule } from "@nestjs/jwt";
import { RoomsService } from "./services/rooms.service";
import { Rooms, RoomsSchema } from "../../schemas/rooms.schema";
import { ChatRoomsGateway } from "./gateway/chatRooms.gateway";
import { jwtConfig } from "../../config/configuration";

@Module({
  providers: [
    ChatService,
    ChatGateway,
    ChatRoomsGateway,
    RoomsService
  ],
  imports: [
    JwtModule.register(jwtConfig),
    MongooseModule.forFeature([
      { name: UsersInRoom.name, schema: UsersInRoomSchema },
      { name: Messages.name, schema: MessagesSchema },
      { name: Rooms.name, schema: RoomsSchema }
    ])
  ],
  exports: [ChatService]
})
export class ChatModule {
}
