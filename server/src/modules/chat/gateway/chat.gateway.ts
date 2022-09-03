import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { config, socketPort } from '../websocket.options';
import { JwtService } from "@nestjs/jwt";
import {UnauthorizedException} from "@nestjs/common";
import {SocketActions} from "../../../constants/socket.actions";
import { MessageType } from "../../../typing/message.type";

@WebSocketGateway(socketPort, config)
export class ChatGateway {
  constructor(
      private readonly chatService: ChatService,
      private readonly jwtService: JwtService
      ) { }

  @WebSocketServer() server: Server;

  @SubscribeMessage(SocketActions.join)
  async join(
    socket: Socket,
    sender: { name: string; room: string },
  ): Promise<void> {
    try {
    const auth_token = JSON.parse(socket.handshake.headers.authorization).token;
    if (this.jwtService.verify(auth_token)) {
      this.server.emit(
          SocketActions.outMsgs,
          await this.chatService.getAllMessages(sender.room),
      );
      const user = await this.chatService.addUser(
          socket.id,
          sender.name,
          sender.room,
      );
      socket.join(user.room);
      socket.emit(SocketActions.message, {
        user: 'admin',
        text: `${user.name}, welcome to the room ${user.room}`,
      });
      socket.broadcast
          .to(user.room)
          .emit(SocketActions.message, {user: 'admin', text: `${user.name} has joined!`});
      this.server.to(user.room).emit(SocketActions.usersInRoom, {
        room: user.room,
        users: await this.chatService.getUsersInRoom(user.room),
      });
    }
  } catch (e) {
      throw new UnauthorizedException({message: 'No access'})
    }
  }

  @SubscribeMessage(SocketActions.sendMsg)
  async handleMessage(socket: Socket, msg: MessageType): Promise<void> {
    const user = await this.chatService.getUser(socket.id);
    await this.chatService.sendMessage(user.name, msg.message, user.room, msg.avatarId);
    this.server
      .to(user.room)
      .emit(SocketActions.message, { user: user.name, text: msg.message, imageId: msg.avatarId });
  }

  @SubscribeMessage(SocketActions.disconnect)
  async disconnect(socket: Socket): Promise<void> {
    const user = await this.chatService.removeUser(socket.id);
    if (user) {
      this.server
        .to(user.room)
        .emit(SocketActions.message, { user: 'admin', text: `${user.name} has left` });
      this.server.to(user.room).emit(SocketActions.usersInRoom, {
        room: user.room,
        users: await this.chatService.getUsersInRoom(user.room),
      });
    }
  }
}
