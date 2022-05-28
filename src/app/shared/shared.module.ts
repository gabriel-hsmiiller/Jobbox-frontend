import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PhonePipe } from '../pipes/phone.pipe';

@NgModule({
  declarations: [PhonePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
		MatRippleModule,
		MatCheckboxModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    PhonePipe,
    FormsModule,
    ReactiveFormsModule,
		MatRippleModule,
		MatCheckboxModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
	],
  providers: []
})
export class SharedModule { }
