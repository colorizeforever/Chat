import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoomsService } from "../services/rooms.service";
import { Observable } from "rxjs";
import { RoomModelI } from "../../../../models/room.model";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsComponent implements OnInit {
  room: string = ''
  rooms$: Observable<RoomModelI[]> = this.roomsService.rooms$;

  constructor(
    private readonly roomsService: RoomsService,
  ) { }

  ngOnInit(): void {
    this.roomsService.activateSocket();
  }

  createRoom(): void {
    this.roomsService.createRoom(this.room);
    this.room = '';
  }

}
