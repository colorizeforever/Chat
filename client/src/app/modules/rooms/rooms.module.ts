import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from '../../pages/auth/rooms/components/rooms.component';
import { RoomsRoutingModule } from '../../pages/auth/rooms/rooms-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RoomsService } from '../../pages/auth/rooms/rooms.service';

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
