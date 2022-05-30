import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../jobs/components/image-modal/image-modal.component';
import { GetFilesService } from '../services/get-files.service';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'jbx-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  jobs: any[] = [];

  constructor(private jobsService: JobsService, private filesService: GetFilesService, private dialog: MatDialog) { }

  async ngOnInit() {
    await this.loadJobs(1);
  }

  async loadJobs(page: number) {
    let jobs = await this.jobsService.getAllJobs().toPromise();

    jobs = jobs.sort((a,b) => {

      if (!a.snapshots) {
        a.snapshots = [];
      }

      if (!b.snapshots) {
        b.snapshots = [];
      }

      const lastesSnapshotTimeA = Math.max(...a.snapshots!.map(snapshot => new Date(snapshot.updated_at).getTime() || 0));
      const lastesSnapshotTimeB = Math.max(...b.snapshots!.map(snapshot => new Date(snapshot.updated_at).getTime() || 0));

      return lastesSnapshotTimeA < lastesSnapshotTimeB ? 1 : lastesSnapshotTimeA > lastesSnapshotTimeB ? -1 : 0;
    });

    const list = await Promise.all(jobs.map(async (job) => {
      const item: any = {};

      item.lastSnapshot = job.snapshots![job.snapshots!.length - 1];
      item.colaborators = job.colaborators!;
      item.client = job.client!;
      
      if (item.client.user.image) {
        const reader = new FileReader();
        const file = await this.filesService.getAvatarFile(item.client.user.image as string).toPromise();
        
        reader.readAsDataURL(file);
        reader.onload = () => {
          const preview = reader.result as string;
          const filename = item.client.user.image;
          
          item.clientImage = { preview, original: file, filename };
        }
        
      }

      const portfolios: any[] = [];
      if (!item.lastSnapshot) {
        item.lastSnapshot = { content: [] };
      }

      await Promise.all(item.lastSnapshot.content.map(async (content: any) => {
        const file = await this.getContent(content);
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          const preview = reader.result as string;
          const filename = content;

          portfolios.push({ preview, original: file, filename });
        }
      }));

      item.portfolio = portfolios;

      return item;
    }));

    this.jobs = list;
  }

  async getContent(content: string) {
    return await this.filesService.getPortfolioFile(content).toPromise();
  }

  openImageOverlay(index: number, portfolio: any) {
    this.dialog.open(ImageModalComponent, { height: '80vh', width: '80vw', data: {images: portfolio, index} })
  }

}
