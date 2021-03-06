import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './signin/signin.component';
import {AuthRoutingModule} from "./auth-routing.module";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from "./signup/signup.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,

    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule { }
