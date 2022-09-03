import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './component/rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RoomsService } from './services/rooms.service';

@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoomsRoutingModule,
    SharedModule,
  ],
  providers: [RoomsService],
})
export class RoomsModule { }
