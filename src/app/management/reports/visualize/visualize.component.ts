import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportDataTheme } from 'src/app/enum/report-data-theme.enum';
import { ReportDataType } from 'src/app/enum/report-data-type.enum';
import { ReportDto } from 'src/app/models/report-dto';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'jbx-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {

  reportId: any;
  reportData?: ReportDto;

  printConfig = {
    pageTitle: `Relatório Jobbox - ${this.reportData?._id}`,
    styles: [''],
  }

  constructor(private reportsService: ReportsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportId = this.route.snapshot.params['id'];
    this.getReportById();
  }

  async getReportById() {
    try {
      const report = await this.reportsService.getReport(this.reportId).toPromise();
      console.log(report);
      this.reportData = report;
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  }

  dataHasJobStatus() {
    return !!this.reportData?.data[ReportDataType.APPROVED_JOBS]
        || !!this.reportData?.data[ReportDataType.NEW_JOBS]
        || !!this.reportData?.data[ReportDataType.CLOSED_JOBS]
        || !!this.reportData?.data[ReportDataType.DONE_JOBS];
  }

  dataHasUserRegister() {
    return !!this.reportData?.data[ReportDataType.NEW_USERS];
  }

  dataHasUserDeactivation() {
    return !!this.reportData?.data[ReportDataType.INACTIVATED_USERS];
  }
}
