import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  template: `
    <h2 mat-dialog-title style="font-size: 24px !important;">Atenção</h2>
    <mat-dialog-content>
      <span>Essa ação é potencialmente destrutiva e irreparável.</span><br><br>
      <span>Continuar?</span>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button matDialogClose mat-flat-button>Não</button>
        <button (click)="confirmAction()" mat-flat-button [color]="'warn'">Sim</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  confirmAction() {
    this.data.onConfirm();
  }
}
