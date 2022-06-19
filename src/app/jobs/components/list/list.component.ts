import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobStatus } from 'src/app/enum/job-status';
import { JobStatusTranslate } from 'src/app/enum/job-status-translate.enum';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { UserType } from 'src/app/enum/user-type';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';

enum StatusPosition {
  'CREATED' = 0,
  'IN_ANALYSIS' = 1,
  'CLOSED' = 2,
  'FREE' = 3,
  'IN_PROGRESS' = 4,
  'IN_REVISION' = 5,
  'DONE' = 6
}

@Component({
  selector: 'jbx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  jobsTable: Job[][] = [[],[],[],[],[],[],[]];
  loggedUserData!: User;
  loggedUserType!: UserType;

  UserType = UserType;

  searchString: string = '';
  searchInitialDate!: Date;
  searchFinalDate!: Date;

  JobStatusTranslate = JobStatusTranslate;

  constructor(private jobsService: JobsService, private localStorageService: LocalStorageService, private router: Router, private dialog: MatDialog) { }

  async ngOnInit() {
    this.loggedUserData = User.fromJson(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '');
    this.loggedUserType = this.localStorageService.getKey(LocalStorageKey.USER_TYPE) as UserType;

    await this.getUserJobs();
  }

  async getUserJobs() {
    this.jobsTable = [[],[],[],[],[],[],[]];
    try {
      const response = await this.jobsService.getJobsByUser(this.loggedUserData.id).toPromise();

      response.forEach((item) => {
        this.addItemToColumn(item);
      });
    } catch (error) {
      console.log(error);
    }
  }

  getSearchedValue(item: Job) {
    let mustAppear: boolean = true;

    if (this.searchString.trim().length > 0) {
      mustAppear = mustAppear && item.title.includes(this.searchString) || item.description.includes(this.searchString);
    }

    if (this.searchInitialDate) {
      mustAppear = mustAppear && new Date(item.created_at).getTime() >= new Date(this.searchInitialDate).getTime();
    }

    if (this.searchFinalDate) {
      console.log(new Date(this.searchFinalDate));
      mustAppear = mustAppear && new Date(item.updated_at).getTime() <= new Date(this.searchFinalDate).getTime();
    }

    return mustAppear;
  }

  async removeJob(job: Job) {
    const ref = this.dialog.open(ConfirmDialog, { data: { onConfirm: async () => {
      try {
        const response = await this.jobsService.removeJobById(job.id).toPromise();        
        await this.getUserJobs();
      } catch (error) {
        console.log(error);
      }

      ref.close();
    }}});
  }

  navigateToCreate() {
    this.router.navigateByUrl('/job/create');
  }

  navigateToJob(job: Job) {
    if (job.status?.status === JobStatus.DONE) {
      this.navigateToView(job.id);
    } else {
      this.navigateToEdit(job.id);
    }
  }

  private navigateToView(jobId: number) {
    this.router.navigateByUrl('/job/view/' + jobId );
  }

  private navigateToEdit(jobId: number) {
    this.router.navigateByUrl('/job/' + this.loggedUserType.toLowerCase() + '/edit/' + jobId );
  }

  private addItemToColumn(item: Job) {
    this.jobsTable[StatusPosition[item.status?.status!]].push(item);
  }

}
