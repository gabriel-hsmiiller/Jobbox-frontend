import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RecoveredComponent } from './recovered/recovered.component';
import { RecoveringComponent } from './recovering/recovering.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { SignupComponent } from './signup/signup.component';
import { TokenSentComponent } from './token-sent/token-sent.component';

const routes: Routes = [
  { 
    path: '', 
    component: AuthComponent, 
    children: [
      { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
      }, 
      { 
        path: 
        'login', 
        component: LoginComponent 
      }, 
      { 
        path: 'signup', 
        component: SignupComponent 
      },
      {
        path: 'recovery',
        component: RecoveryComponent
      },
      {
        path: 'token-sent',
        component: TokenSentComponent
      },
      {
        path: 'recovering',
        component: RecoveringComponent
      },
      {
        path: 'recovered',
        component: RecoveredComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
