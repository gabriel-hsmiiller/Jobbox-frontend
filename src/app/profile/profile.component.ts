import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LocalStorageKey } from '../enum/local-storage-key';
import { User } from '../models/user';
import { GetFilesService } from '../services/get-files.service';
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
  doneJobs = [];
  wipJobs = [];
  selectedTab: 'done' | 'wip' = 'done';

  constructor(private profileService: ProfileService,
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

  selectTab(tab: 'done' | 'wip') {
    this.selectedTab = tab;
    if (tab === 'done') {

    } else {

    }
  }

  openEditModal() {
    this.dialog.open(EditProfileModalComponent, {
      width: '988px',
      data: this.userData,
    }).afterClosed().subscribe(async () => {
      this.userData = JSON.parse(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '{}');
      await this.getUserAvatar();
    });
  }

}
