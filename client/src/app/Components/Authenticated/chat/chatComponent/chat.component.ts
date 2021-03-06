import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Observable} from "rxjs";
import {MessagesModelI} from "../../../../models/chat.model";
import { getAvatarId, getLoginFromStorage } from "../../../../utils/tokenHelper";
import {ActivatedRoute} from "@angular/router";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messageList$: Observable<MessagesModelI[]> = this.chatService.messages$;
  public message: string = '';
  public username: string = '';
  public avatarLink: string = environment.FILES_URL
  constructor(
    private chatService: ChatService,
    private activateRoute: ActivatedRoute,
  ) { }

  public sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit(): void {
     this.chatService.setRoom(getLoginFromStorage(), this.activateRoute.snapshot.params['room'])
     this.username = getLoginFromStorage();
  }

  ngOnDestroy(): void {
    this.chatService.onDisconnect();
  }

}
