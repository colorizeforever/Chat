import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import { MessagesModelI } from '../../../../shared/models/chat.model';
import { getLoginFromStorage } from '../../../../utils/tokenHelper';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  messageList$: Observable<MessagesModelI[]> = this.chatService.messages$;
  message = '';
  username = '';
  avatarLink = environment.FILES_URL;

  constructor(
    private readonly chatService: ChatService,
    private readonly activateRoute: ActivatedRoute
  ) {
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit(): void {
    this.chatService.setRoom(getLoginFromStorage(), this.activateRoute.snapshot.params['room']);
    this.username = getLoginFromStorage();
  }

  ngOnDestroy(): void {
    this.chatService.onDisconnect();
  }

}
