import { Injectable} from '@angular/core';
import { io} from 'socket.io-client';
import { environment } from '../../../../../environments/environment';
import { MessagesModelI } from '../../../../models/chat.model';
import { SocketActions } from '../../../../constants/socket.actions';
import { formSocketOptions } from '../../../../config/socket.config';
import { destroyToken, getAvatarId } from '../../../../utils/tokenHelper';
import { BehaviorSubject } from 'rxjs';
import { chatInitialVal } from '../../../../constants/chat.initialvalue';

@Injectable()
export class ChatService {
  private readonly socket = io(`${environment.SOCKET_URL}`, formSocketOptions());
  private readonly messageState$: BehaviorSubject<MessagesModelI[]> = new BehaviorSubject(chatInitialVal);
  messages$ = this.messageState$.asObservable();

  setRoom(name: string, room: string): void {
    this.socket.emit(SocketActions.join, {name, room});
    this.getAllMessages();
  };

  sendMessage(message: string): void {
    const avatarId = getAvatarId();
    this.socket.emit(SocketActions.sendMsg, { message, avatarId });
    this.socket.off(SocketActions.message).on(SocketActions.message, (msg: MessagesModelI) => {
      this.messageState$.next([...this.messageState$.value, {...msg}]);
    });
  };

  getAllMessages(): void {
    this.socket.on(SocketActions.outputMsgs, (allMessages: MessagesModelI[]) => {
      this.messageState$.next(allMessages);
    });
  };

  onDisconnect(): void {
    this.socket.emit(SocketActions.disconnect);
    this.socket.off();
    destroyToken();
  };

}
