import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './component/rooms.component';
import {RoomsRoutingModule} from "./rooms-routing.module";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoomsRoutingModule,
    SharedModule
  ]
})
export class RoomsModule { }
