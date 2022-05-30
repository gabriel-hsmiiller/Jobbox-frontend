import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JobStatus } from '../enum/job-status';
import { LocalStorageKey } from '../enum/local-storage-key';
import { Job } from '../models/job';
import { User } from '../models/user';
import { GetFilesService } from '../services/get-files.service';
import { JobsService } from '../services/jobs.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProfileService } from '../services/profile.service';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'jbx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private userId!: string;
  loggedUserId!: string;
  userImage: any;

  userData!: User;
  doneJobs: Array<any> = [];
  wipJobs: Array<any> = [];
  selectedTab: 'done' | 'wip' = 'done';

  constructor(private profileService: ProfileService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private getFilesService: GetFilesService,
    private sanitization: DomSanitizer,
    private dialog: MatDialog) { }

  async ngOnInit() {
    await this.getUserById();
  }

  async getUserById() {
    let userId: string = this.route.snapshot.params['id'];

    const loggedUserData: User = JSON.parse(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '{}');
    this.loggedUserId = loggedUserData.id.toString();

    if (!userId || !userId.trim()) {
      userId = this.loggedUserId;
      this.userId = userId;
      this.userData = loggedUserData;

      await this.getUserAvatar();
      await this.getJobsByUser();
    } else {
      const user = await this.profileService.getUserById(userId).toPromise();
      this.userId = userId;
      this.userData = user;
    }
  }

  async getUserAvatar() {
    try {
      const response = await this.getFilesService.getAvatarFile(this.userData.image as string).toPromise();
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onload = () => {
        this.userImage = reader.result;
        this.sanitization.bypassSecurityTrustStyle(`url(${this.userImage})`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getJobsByUser() {
    try {
      const response = await this.jobsService.getJobsByUser(this.userId).toPromise();

      response.reverse().forEach(async (job) => {
        const latestDateSnapshot = Math.max(...job.snapshots!.map((snapshot) => new Date(snapshot.updated_at).getTime() || 0));
        const latestSnapshot = job.snapshots!.find(snapshot => new Date(snapshot.updated_at).getTime() === latestDateSnapshot);
        let file: any;

        if (job.status?.status === JobStatus.DONE) {
          this.doneJobs.push({ id: job.id, cover: null });
        }

        if (job.status?.status !== JobStatus.CLOSED && job.status?.status !== JobStatus.DONE) {
          this.wipJobs.push({ id: job.id, cover: null });
        }

        if (latestSnapshot) {
          file = await this.getFilesService.getPortfolioFile(latestSnapshot!.content[0]).toPromise();
        }

        if (file)  {
          const reader = new FileReader();
  
          reader.readAsDataURL(file);
  
          reader.onload = () => {
            const result = reader.result as string;
  
            if (job.status?.status === JobStatus.DONE) {
              const index = this.doneJobs.findIndex((item) => item.id === job.id);
              this.doneJobs[index].cover = result;
            }
  
            if (job.status?.status !== JobStatus.CLOSED && job.status?.status !== JobStatus.DONE) {
              const index = this.wipJobs.findIndex((item) => item.id === job.id);
              this.wipJobs[index].cover = result;
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  selectTab(tab: 'done' | 'wip') {
    this.selectedTab = tab;
  }

  openEditModal() {
    const subscription = this.dialog.open(EditProfileModalComponent, {
      width: '988px',
      data: this.userData,
    }).afterClosed().subscribe(async () => {
      this.userData = JSON.parse(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '{}');
      await this.getUserAvatar();
      subscription.unsubscribe();
    });
  }

}
