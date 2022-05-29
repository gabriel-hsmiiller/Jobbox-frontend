import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JobSnapshotChangeDetailTranslate } from 'src/app/enum/job-snapshot-change-detail-translate.enum';
import { JobStatus } from 'src/app/enum/job-status';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { UserType } from 'src/app/enum/user-type';
import { Job } from 'src/app/models/job';
import { JobSnapshot } from 'src/app/models/job-snapshot';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ColaboratorsModalComponent } from '../colaborators-modal/colaborators-modal.component';
import { SnapshotDetailModalComponent } from '../snapshot-detail-modal/snapshot-detail-modal.component';

@Component({
  selector: 'jbx-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  JobSnapshotChangeDetailTranslate = JobSnapshotChangeDetailTranslate;
  JobStatus = JobStatus;
  jobForm!: FormGroup;
  private loggedUserType = UserType.CLIENT;
  private loggedUserId!: number;
  private jobId!: number;
  jobData!: Job;

  constructor(builder: FormBuilder,
    private localStorageService: LocalStorageService,
    private jobsService: JobsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
      this.jobForm = builder.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        expires_at: new FormControl(null, [Validators.required]),
        has_expiration: new FormControl(true),
      });
  }

  async ngOnInit() {
    const userType = this.localStorageService.getKey(LocalStorageKey.USER_TYPE);
    if (!userType) {
      this.jobForm.disable();
      return;
    }

    this.loggedUserType = UserType[userType as UserType];

    if (this.loggedUserType !== UserType.CLIENT) {
      this.jobForm.disable();
      return;
    }

    const loggedUserData = User.fromJson(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '');

    this.loggedUserId = loggedUserData.id;

    this.jobId = this.route.snapshot.params.id;

    await this.getJobById();
  }

  async onSubmit() {
    if (this.jobForm.invalid) {
      return;
    }

    const {value} = this.jobForm;
    if (value.expires_at) value.expires_at = new Date(value.expires_at);

    value.responsibleUserId = this.loggedUserId;

    try {
      const response = await this.jobsService.updateJob(this.jobId, value).toPromise();
      console.log(response);
      this.router.navigateByUrl('/job');
    } catch (error) {
      console.log(error);
    }
  }

  async onApprove(){
    try {
      const response = await this.jobsService.updateJobStatus(this.jobId, { responsibleUserId: this.loggedUserId, status: JobStatus.DONE }).toPromise();
      console.log(response);

      this.router.navigateByUrl('/job/view/' + this.jobId);
    } catch (error) {
      console.log(error);
    }
  }

  async getJobById() {
    try {
      const response = await this.jobsService.getJobById(this.jobId).toPromise();
      this.jobData = response;

      const editJobData = {
        title: response.title,
        description: response.description,
        expires_at: response.expires_at,
        has_expiration: response.expires_at ? true : false
      }

      this.jobForm.patchValue(editJobData);
      this.jobForm.get('title')?.disable();
    } catch (error) {
      console.log(error);
    }
  }
  
  getExpirationHasValidator() {
    return this.jobForm?.controls?.expires_at?.hasValidator(Validators.required);
  }

  onChangeHasExpiration() {
    if (this.jobForm.get('has_expiration')?.value) {
      this.jobForm.get('expires_at')?.addValidators(Validators.required);
    } else {
      this.jobForm.get('expires_at')?.removeValidators(Validators.required);
    }
    this.jobForm.get('expires_at')?.updateValueAndValidity();
  }

  openColaboratorsDialog() {
    const subscription = this.dialog.open(ColaboratorsModalComponent, {
      width: '768px',
      data: this.jobData
    }).afterClosed().subscribe(async () => {
      await this.getJobById();
      subscription.unsubscribe();
    });
  }

  openSnapshotDetailDialog(snapshot: JobSnapshot) {
    this.dialog.open(SnapshotDetailModalComponent, { data: {snapshot, job: this.jobData}, width: '768px' });
  }

  getResponsibleName(id: number) {
    const isClient = id === this.jobData.client?.user.id;
    if (!id) {
      return 'Não registrado'
    }

    let name: string;
    if (isClient) {
      const {user} = this.jobData.client!;
      name = user.name + ' ' + user.surname;
    } else {
      const colaborator = this.jobData.colaborators?.find(c => c.user.id === id);
      name = colaborator?.user.name + ' ' + colaborator?.user.surname;
    }

    return name;
  }

  navigateToList() {
    this.router.navigateByUrl('/job');
  }

}
