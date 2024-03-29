import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './signin-page/signin.component';
import { SignUpComponent } from './signup-page/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'signin', pathMatch: 'full'},
      {path: 'signin', component: SignInComponent},
      {path: 'signup', component: SignUpComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
