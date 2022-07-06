import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chatComponent/chat.component';
import {FormsModule} from "@angular/forms";
import {ChatRoutingModule} from "./chat-routing.module";
import {SharedModule} from "../../../shared/shared.module";

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
})
export class ChatModule { }
