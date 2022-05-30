import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobStatus } from '../enum/job-status';
import { CreateJobDto } from '../models/create-job-dto';
import { Job } from '../models/job';
import { UpdateJobColaboratorsDto } from '../models/update-job-colaborators-dto';
import { UpdateJobDto } from '../models/update-job-dto';
import { JobResponse } from '../types/job-response';
import { BaseHttpService } from './base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  createJob(jobData: CreateJobDto): Observable<JobResponse> {
    return super.post<JobResponse>('/jobs', jobData);
  }

  getAllJobs(): Observable<Array<Job>> {
    return super.get<Array<Job>>('/jobs/');
  }

  getJobsByUser(userId: number | string): Observable<Array<Job>> {
    return super.get<Array<Job>>('/jobs/u/' + userId);
  }

  getJobById(jobId: number | string): Observable<Job> {
    return super.get<Job>('/jobs/i/' + jobId);
  }

  updateJob(jobId: number | string, updateData: FormData): Observable<JobResponse> {
    return super.patch<JobResponse>('/jobs/i/' + jobId, updateData);
  }

  updateJobColaborators(jobId: number | string, updateColaborators: UpdateJobColaboratorsDto): Observable<JobResponse> {
    return super.patch<JobResponse>('/jobs/c/' + jobId, updateColaborators);
  }

  updateJobStatus(jobId: number | string, updateStatus: { responsibleUserId: number, status: JobStatus }): Observable<JobResponse> {
    return super.patch<JobResponse>('/jobs/s/' + jobId, updateStatus);
  }

  removeJobById(jobId: number | string): Observable<any> {
    return super.delete<any>('/jobs/' + jobId);
  }
}
