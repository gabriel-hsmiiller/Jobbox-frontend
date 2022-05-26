import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialog, EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileModalComponent,
    ConfirmDialog
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
