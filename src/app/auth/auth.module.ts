import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoHorizontalComponent } from './components/svg/logo-horizontal/logo-horizontal.component';
import { SharedModule } from '../shared/shared.module';
import { RecoveryComponent } from './recovery/recovery.component';
import { TokenSentComponent } from './token-sent/token-sent.component';
import { RecoveringComponent } from './recovering/recovering.component';
import { RecoveredComponent } from './recovered/recovered.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    LogoHorizontalComponent,
    RecoveryComponent,
    TokenSentComponent,
    RecoveringComponent,
    RecoveredComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
