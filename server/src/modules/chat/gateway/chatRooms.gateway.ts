import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {config, socketPort} from '../websocket.options';
import {Server, Socket} from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import {RoomsService} from "../services/rooms.service";
import {BadRequestException, UnauthorizedException, UseFilters} from "@nestjs/common";
import {SocketActions} from "../../../constants/socket.actions";
import {WsExceptionFilter} from "../../../exceptions/SocketExceptionFilter";
import {ErrorThrower} from "../../../constants/errors";

@WebSocketGateway(socketPort, config)
export class ChatRoomsGateway {
  constructor(
      private jwtService: JwtService,
      private roomService: RoomsService
      ) {}

  @WebSocketServer() server: Server;

  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage(SocketActions.joined)
  async getRooms(socket: Socket): Promise<void> {
      try {
        const auth_token = JSON.parse(socket.handshake.headers.authorization,).token;
        if (this.jwtService.verify(auth_token)) {
          try {
              this.server.emit(
                  SocketActions.outRooms,
                  await this.roomService.getAllRooms()
              );
          } catch (e) {
              ErrorThrower(e)
          }
        }
      } catch (e) {
        throw new UnauthorizedException({message: 'No access'});
      }
  }

  @SubscribeMessage(SocketActions.createRoom)
  async createRoom(socket: Socket, room: string): Promise<void> {
   await this.roomService.createRoom(room)
   this.server
     .to(socket.id)
     .emit(SocketActions.room, {room, lastMessage: 'Be first user who send message', user: 'Admin'})
  }

}
