import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { Client } from 'src/app/models/client';
import { Colaborator } from 'src/app/models/colaborator';
import { Job } from 'src/app/models/job';
import { JobSnapshot } from 'src/app/models/job-snapshot';
import { User } from 'src/app/models/user';
import { GetFilesService } from 'src/app/services/get-files.service';
import { JobsService } from 'src/app/services/jobs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'jbx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  loggedUserId!: number;
  jobId!: number;
  colaborators!: Array<Colaborator>;
  client!: Client;
  lastSnapshot!: JobSnapshot;
  portfolio: Array<any> = [];
  clientImage: any;

  constructor(
    private jobsService: JobsService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private filesService: GetFilesService,
    private location: Location) { }

  async ngOnInit() {
    const loggedUserData = User.fromJson(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '');
    this.loggedUserId = loggedUserData.id;
    this.jobId = this.route.snapshot.params.id;
    await this.getJobById();
  }

  async getJobById() {
    try {
      const response = await this.jobsService.getJobById(this.jobId).toPromise();      
      this.lastSnapshot = response.snapshots![response.snapshots!.length - 1];
      this.colaborators = response.colaborators!;
      this.client = response.client!;
      
      if (this.client.user.image) {
        const reader = new FileReader();
        const file = await this.filesService.getAvatarFile(this.client.user.image as string).toPromise();
        
        reader.readAsDataURL(file);
        reader.onload = () => {
          const preview = reader.result as string;
          const filename = this.client.user.image;
          
          this.clientImage = { preview, original: file, filename };
        }
        
      }

      const portfolios: any[] = [];

      await Promise.all(this.lastSnapshot.content.map(async (content) => {
        const file = await this.getContent(content);
        const reader = new FileReader();
        let data;

        reader.readAsDataURL(file);
        reader.onload = () => {
          const preview = reader.result as string;
          const filename = content;

          portfolios.push({ preview, original: file, filename });
        }

        return data;
      }));

      this.portfolio = portfolios;
    } catch (error) {
      console.log(error);
    }
  }

  async getContent(content: string) {
    return await this.filesService.getPortfolioFile(content).toPromise();
  }
  
  openImageOverlay(index: number) {
    this.dialog.open(ImageModalComponent, { height: '80vh', width: '80vw', data: {images: this.portfolio, index} })
  }

  navigateBack() {
    this.location.back();
  }
}
