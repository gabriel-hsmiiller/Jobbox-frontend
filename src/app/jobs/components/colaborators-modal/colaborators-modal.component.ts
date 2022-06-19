import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Colaborator } from 'src/app/models/colaborator';
import { Job } from 'src/app/models/job';
import { UpdateJobColaboratorsDto } from 'src/app/models/update-job-colaborators-dto';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'jbx-colaborators-modal',
  templateUrl: './colaborators-modal.component.html',
  styleUrls: ['./colaborators-modal.component.scss']
})
export class ColaboratorsModalComponent implements OnInit {

  colaboratorsForm: FormGroup;
  colaborators: Array<User> = [];

  searchString: string = '';

  constructor(public dialogRef: MatDialogRef<ColaboratorsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job,
    builder: FormBuilder, 
    private profileService: ProfileService,
    private jobsService: JobsService,
    private dialog: MatDialog) {
    this.colaboratorsForm = builder.group({});
  }

  async ngOnInit() {
    await this.getColaborators();
  }

  async getColaborators() {
    const response = await this.profileService.getAllColaborators().toPromise();

    this.colaborators = response.map(u => {
      this.includeColaboratorFormControl(u.colaborator!);
      return u!
    });
  }

  includeColaboratorFormControl(colaborator: Colaborator) {
    const value = this.data.colaborators?.map(c => c.id).includes(colaborator.id);
    const control = new FormControl(value);
    this.colaboratorsForm.addControl(colaborator.id.toString(), control);
  }

  async onSubmit() {
    const value: { [key: string]: boolean } = this.colaboratorsForm.value;

    const selectedValues = Object.keys(value).map(key => {
      if(value[key]) return +key;
      return;
    }).filter(el => el !== undefined);

    const isRemovingColaborator = this.colaborators.reduce((prev, colaborator) => !prev ? !selectedValues.includes(colaborator.colaborator!.id) : prev, false);

    let confirmDialog: MatDialogRef<ConfirmDialog>;

    const onConfirm = async () => {
      const submitData = { colaboratorsId: selectedValues };
      try {
        await this.jobsService.updateJobColaborators(this.data.id, submitData).toPromise();
        this.dialogRef.close();
        confirmDialog?.close();
      } catch (error) {
        console.log(error);
      }
    }

    if (isRemovingColaborator) {
      confirmDialog = this.dialog.open(ConfirmDialog, { data: { onConfirm } })
    } else {
      await onConfirm();
    }
  }

  getSearchedValue(user: User) {
    return user.name.includes(this.searchString) || user.surname.includes(this.searchString) || user.email.includes(this.searchString);
  }

}
