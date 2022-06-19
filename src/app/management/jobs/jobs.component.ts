import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { JobStatus } from 'src/app/enum/job-status';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'jbx-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JobsComponent implements OnInit, AfterViewInit, OnDestroy {

  private _showInactives: boolean = true;

  displayedColumns: string[] = ['id', 'title', 'expires_at', 'created_at', 'isActive'];

  expandedElement: Job | null = null;

  dataSource!: MatTableDataSource<Job>;

  noDataMessage = '';

  loggedUserId: number = 0;

  JobStatus = JobStatus;

  tabChangeSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(private jobsService: JobsService, private localStorageService: LocalStorageService) {
    this.dataSource = new MatTableDataSource();
  }

  get showInactives() {
    return this._showInactives;
  };

  set showInactives(value: boolean) {
    this._showInactives = value;
    const status = this.tabGroup.selectedIndex === 0 ? JobStatus.CREATED : this.tabGroup.selectedIndex === 1 ? JobStatus.IN_ANALYSIS : JobStatus.CLOSED
    this.getJobs(status);
  }

  ngOnInit(): void {
    const user = JSON.parse(this.localStorageService.getKey(LocalStorageKey.USER_DATA)!) as User;
    this.loggedUserId = user.id;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.setTab(this.tabGroup.selectedIndex!);
    this.tabChangeSubscription = this.tabGroup.focusChange.subscribe((e) => this.setTab(e.index));
  }

  ngOnDestroy(): void {
    this.tabChangeSubscription?.unsubscribe();
  }

  async getJobs(status: JobStatus) {
    try {
      const jobs = await this.jobsService.getJobsByStatusForAdmin(status, this._showInactives).toPromise();
      this.dataSource.data = jobs;
    } catch (error) {
      if ((error as HttpErrorResponse).status === HttpStatusCode.NotFound) {
        this.dataSource.data = [];
        this.noDataMessage = 'Sem jobs para este status.';
      }
      // TODO: add treatment here
    }
  }

  async setJobStatus(jobId: number, status: JobStatus) {
    try {
      const response = await this.jobsService.updateJobStatus(jobId, { status, responsibleUserId: this.loggedUserId }).toPromise();
      this.dataSource.data = this.dataSource.data.filter((job) => job.id !== response.job.id);
    } catch (error) {
      console.log(error);
      // TODO: add treatment here
    }
  }

  setTab(index: number) {
    const status = index === 0 ? JobStatus.CREATED : index === 1 ? JobStatus.IN_ANALYSIS : JobStatus.CLOSED;
    this.getJobs(status);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.filteredData.length === 0) {
      this.noDataMessage = 'Sem correspondência para o filtro.';
    }

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
