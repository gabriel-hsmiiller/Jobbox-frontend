import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobSnapshotChangeDetailTranslate } from 'src/app/enum/job-snapshot-change-detail-translate.enum';
import { Job } from 'src/app/models/job';
import { JobSnapshot } from 'src/app/models/job-snapshot';
import { GetFilesService } from 'src/app/services/get-files.service';

@Component({
  selector: 'jbx-snapshot-detail-modal',
  templateUrl: './snapshot-detail-modal.component.html',
  styleUrls: ['./snapshot-detail-modal.component.scss']
})
export class SnapshotDetailModalComponent implements OnInit {

  JobSnapshotChangeDetailTranslate = JobSnapshotChangeDetailTranslate;

  constructor(public dialogRef: MatDialogRef<SnapshotDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { snapshot: JobSnapshot, job: Job },
    private fileService: GetFilesService, private router: Router) { }

  ngOnInit(): void {
  }

  getResponsibleName(id: number) {
    const isClient = id === this.data.job.client?.user.id;
    if (!id) {
      return 'Não registrado'
    }

    let name: string;
    if (isClient) {
      const {user} = this.data.job.client!;
      name = user.name + ' ' + user.surname;
    } else {
      const colaborator = this.data.job.colaborators?.find(c => c.user.id === id);
      name = colaborator?.user.name + ' ' + colaborator?.user.surname;
    }

    return name;
  }

  async downloadContent(content: string) {
    const response = await this.fileService.getPortfolioFile(content).toPromise();

    console.log(response);

    window.open(URL.createObjectURL(response));
  }

}
