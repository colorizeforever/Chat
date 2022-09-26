import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../pages/auth/chat/components/chat.component';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from '../../pages/auth/chat/chat-routing.module';
import { SharedModule} from '../../shared/shared.module';
import { ChatService } from '../../pages/auth/chat/chat.service';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    SharedModule
  ],
  providers: [ChatService],
})
export class ChatModule { }
