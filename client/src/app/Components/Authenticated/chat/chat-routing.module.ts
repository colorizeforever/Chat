import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChatComponent} from "./chatComponent/chat.component";

const routes: Routes = [
  {
    path: '', component: ChatComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatRoutingModule { }
