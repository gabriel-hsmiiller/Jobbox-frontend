import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
