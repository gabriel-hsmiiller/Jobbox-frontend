import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JobSnapshotChangeDetailTranslate } from 'src/app/enum/job-snapshot-change-detail-translate.enum';
import { JobStatus } from 'src/app/enum/job-status';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { UserType } from 'src/app/enum/user-type';
import { Job } from 'src/app/models/job';
import { JobSnapshot } from 'src/app/models/job-snapshot';
import { User } from 'src/app/models/user';
import { GetFilesService } from 'src/app/services/get-files.service';
import { JobsService } from 'src/app/services/jobs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnapshotDetailModalComponent } from '../snapshot-detail-modal/snapshot-detail-modal.component';

@Component({
  selector: 'jbx-edit-colaborator',
  templateUrl: './edit-colaborator.component.html',
  styleUrls: ['./edit-colaborator.component.scss']
})
export class EditColaboratorComponent implements OnInit {

  JobSnapshotChangeDetailTranslate = JobSnapshotChangeDetailTranslate;
  JobStatus = JobStatus;
  private loggedUserType = UserType.COLABORATOR;
  private loggedUserId!: number;
  private jobId!: number;
  jobData!: Job;
  selectedFiles: Array<{ preview: string, original: File, filename: string}> = [];

  constructor(private localStorageService: LocalStorageService,
    private jobsService: JobsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private filesService: GetFilesService) { }

  async ngOnInit() {
    const userType = this.localStorageService.getKey(LocalStorageKey.USER_TYPE);

    this.loggedUserType = UserType[userType as UserType];

    const loggedUserData = User.fromJson(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '');

    this.loggedUserId = loggedUserData.id;

    this.jobId = this.route.snapshot.params.id;

    await this.getJobById();
  }

  async onSubmit() {

    const formData: FormData = new FormData();

    formData.append('responsibleUserId', this.loggedUserId as any);
    this.selectedFiles.forEach(s => formData.append('images', s.original));

    try {
      const response = await this.jobsService.updateJob(this.jobId, formData).toPromise();
      this.router.navigateByUrl('/job');
    } catch (error) {
      console.log(error);
    }
  }

  async getJobById() {
    try {
      const response = await this.jobsService.getJobById(this.jobId).toPromise();
      this.jobData = response;

      const mostRecentSnapshot = response.snapshots![response.snapshots!.length - 1];

      const portfolios = await Promise.all(mostRecentSnapshot!.content.map(async (content) => {
        return {file: await this.filesService.getPortfolioFile(content).toPromise(), content}
      }));

      portfolios.forEach(element => {
          const reader = new FileReader();

          reader.readAsDataURL(element.file);
          reader.onload = () => {
            const preview = reader.result as string;
            const file = element.file;
            const filename = element.content;

            this.selectedFiles.push({ preview, original: file, filename });
          }
      });      
    } catch (error) {
      console.log(error);
    }
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

  openSnapshotDetailDialog(snapshot: JobSnapshot) {
    this.dialog.open(SnapshotDetailModalComponent, { data: {snapshot, job: this.jobData}, width: '768px' });
  }

  navigateToList() {
    this.router.navigateByUrl('/job');
  }

  removeFile(file: any) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    console.log(this.selectedFiles);
  }

  handleFiles(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      const file = event.target.files[i];

      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;

        this.selectedFiles.push({ preview: result, original: file, filename: event.target.files[i].name });
      }
    }
  }

}
