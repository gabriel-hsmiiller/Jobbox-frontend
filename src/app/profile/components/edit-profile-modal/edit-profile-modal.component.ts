import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'jbx-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  editUserDataForm!: FormGroup;
  imagePreview?: string;
  imageFile?: File;
  confirmedEmail!: boolean;
  private userId!: string;

  constructor(
    public dialogRef: MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    builder: FormBuilder,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private router: Router) { 
      const {phone, image, id, isConfirmed} = data;
      this.userId = id.toString();
      this.confirmedEmail = isConfirmed;

      this.editUserDataForm = builder.group({
        phone: new FormControl(phone || ''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        image: new FormControl(image || ''),
      });
  }

  ngOnInit(): void { }

  onChangeImage(event: any) {
    event.preventDefault();
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        const result = reader.result as string;
        this.imagePreview = result;
        this.imageFile = file;

        this.editUserDataForm.controls.image.patchValue((file as File).name);
      }
    }
  }

  async onSubmit(event: any) {
    event.preventDefault();

    const userData = this.editUserDataForm.value;
    const formData: FormData = new FormData();

    Object.keys(userData).forEach(key => {
      if (userData[key] !== '') {
        if (key === 'image') {
          formData.append(key, this.imageFile!);
        }
        formData.append(key, userData[key]);
      }
    });

    try {

      const result = await this.profileService.updateUserById(this.userId, formData).toPromise();

      if (result) {
        const userDataString = this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '';
        const parsedUserData = JSON.parse(userDataString);
        
        Object.keys(userData).forEach(key => {
          parsedUserData[key] = (result as any)[key];
        });

        this.localStorageService.setkey(LocalStorageKey.USER_DATA, JSON.stringify(parsedUserData));
        this.dialogRef.close();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deactivateAccount() {

    let dialogRef: MatDialogRef<ConfirmDialog, any>;

    const onConfirm = async () => {
      try {
        const result = await this.profileService.deleteUserById(this.userId).toPromise();

        if (result && result.affected) {
          dialogRef.close();
  
          this.localStorageService.removeKey(LocalStorageKey.TOKEN);
          this.localStorageService.removeKey(LocalStorageKey.USER_DATA);
          this.localStorageService.removeKey(LocalStorageKey.USER_TYPE);
  
          this.router.navigateByUrl('/auth');
          this.dialogRef.close();
        }
      } catch (error) {
        console.log(error);
      }
    }

    dialogRef = this.dialog.open(ConfirmDialog, {
      data: { onConfirm }
    });
  }

}

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