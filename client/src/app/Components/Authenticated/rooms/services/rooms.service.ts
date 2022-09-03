import { Injectable} from '@angular/core';
import { environment} from '../../../../../environments/environment';
import { io } from 'socket.io-client';
import { formSocketOptions } from '../../../../config/socket.config';
import { SocketActions } from '../../../../constants/socket.actions';
import { RoomModelI } from '../../../../models/room.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { roomInitialVal } from '../../../../constants/room.initialvalue';

@Injectable()

export class RoomsService {
  private readonly socket = io(`${environment.SOCKET_URL}`, formSocketOptions());
  private readonly roomState$: BehaviorSubject<RoomModelI[]> = new BehaviorSubject(roomInitialVal);
  rooms$: Observable<RoomModelI[]> = this.roomState$.asObservable();

  activateSocket() {
    this.socket.emit(SocketActions.joined);
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.socket.on(SocketActions.outputRooms, (allRooms: RoomModelI[]) => {
        this.roomState$.next(allRooms);
    });
  };

  createRoom(roomName: string): void {
    this.socket.emit(SocketActions.createRoom, roomName);
    this.socket.off(SocketActions.room).on(SocketActions.room, (room: RoomModelI) => {
      this.roomState$.next([...this.roomState$.value, {...room}]);
    });
  };

}
