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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { PhonePipe } from '../pipes/phone.pipe';
import { ConfirmDialog } from './confirm-dialog.component';
import { ParseUserPipe } from '../pipes/parse-user.pipe';
import { ParseJobPipe } from '../pipes/parse-job.pipe';
import { ParseAnyPipe } from '../pipes/parse-any.pipe';

@NgModule({
  declarations: [PhonePipe, ParseUserPipe, ParseJobPipe, ParseAnyPipe, ConfirmDialog],
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
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatSortModule,
  ],
  exports: [
    PhonePipe,
    ParseUserPipe,
    ParseJobPipe,
    ParseAnyPipe,
    ConfirmDialog,
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
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatSortModule,
	],
  providers: []
})
export class SharedModule { }
