import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../../pages/guest/signin-page/signin.component';
import { AuthRoutingModule } from '../../pages/guest/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../../pages/guest/signup-page/signup.component';
import { SharedModule } from '../../shared/shared.module';
import { FileService } from '../../pages/guest/services/file.service';
import { AuthService } from '../../pages/guest/services/auth.service';
import {MatIconModule} from "@angular/material/icon";

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
    MatIconModule,
  ],
  providers: [
    FileService,
    AuthService,
  ]
})
export class AuthModule { }
