import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportDto } from '../models/report-dto';
import { BaseHttpService } from './base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getReports(): Observable<Array<ReportDto>> {
    return super.get<Array<ReportDto>>('/reports/');
  }

  getReport(id: any): Observable<ReportDto> {
    return super.get<ReportDto>('/reports/' + id);
  }

  createReport(params: ReportDto) {
    return super.post<ReportDto>('/reports/', params);
  }
}
