import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGuard } from './guards/chat.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth/signin', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)},
  {
    path: 'chat/:room',
    canLoad: [ChatGuard],
    loadChildren: () => import('./modules/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'rooms',
    canLoad: [ChatGuard],
    loadChildren: () => import('./modules/rooms/rooms.module').then((m) => m.RoomsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
