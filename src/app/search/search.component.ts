import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { JobStatus } from '../enum/job-status';
import { Job } from '../models/job';
import { User } from '../models/user';
import { GetFilesService } from '../services/get-files.service';
import { JobsService } from '../services/jobs.service';
import { ProfileService } from '../services/profile.service';

type JobLike = (Job & { userImage: any, image: any });
type UserLike = (User & { userImage: any });

@Component({
  selector: 'jbx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {

  showData: Array<Job | User> | Array<JobLike | UserLike> = [];
  allData: Array<Job | User> | Array<JobLike | UserLike> = [];

  selectedFilters: Array<string> = [];
  searchString = '';
  searchStringDebounce = new Subject<string>();
  searchStringDebounceSubscription!: Subscription;

  constructor(private profileService: ProfileService, private jobService: JobsService, private filesService: GetFilesService) { }

  ngOnInit(): void {
    this.searchStringDebounceSubscription = this.searchStringDebounce.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(async (value) => {
      await this.getValues(value);
    });
  }

  ngOnDestroy(): void {
    this.searchStringDebounceSubscription?.unsubscribe();
  }

  async getValues(searchString: string) {

    if(!searchString.trim()) {
      this.allData = [];
      this.showData = [];
      return;
    }

    try {
      const userByName = this.profileService.getUserByName(searchString);
      const jobByTitle = this.jobService.getJobsByTitle(searchString);
      const jobByDescription = this.jobService.getJobsByDescription(searchString);
      const result = await forkJoin([userByName, jobByTitle, jobByDescription]).pipe(
        map((data) => data.reduce((result, arr) => 
            arr ? [
              ...(result as any[]), 
              ...(arr as any[])
            ] : (result as any[]), [])
            .sort((a, b) => (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * -1))
      ).toPromise();

      const list = await Promise.all(result.map(async (resultItem) => {
        let item: UserLike | JobLike = {...resultItem} as any;

        if (this.getIsJob(resultItem)) {
          let lastSnapshot = (resultItem as Job).snapshots![(resultItem as Job).snapshots!.length - 1];
          item.client = (resultItem as Job).client!;

          if (item.client?.user?.image) {
            const reader = new FileReader();
            const file = await this.filesService.getAvatarFile(item.client.user.image as string).toPromise();
            
            reader.readAsDataURL(file);
            reader.onload = () => {
              const preview = reader.result as string;
              const filename = item.client!.user.image;
              
              item.userImage = { preview, original: file, filename };
            }
            
          }

          let portfolio = {};

          if (lastSnapshot && lastSnapshot.content.length > 0) {
            const file = await this.getContent(lastSnapshot.content[0]);
            const reader = new FileReader();
  
            reader.readAsDataURL(file);
            reader.onload = () => {
              const preview = reader.result as string;
              const filename = lastSnapshot.content[0];
  
              portfolio = { preview, original: file, filename };
              item.image = portfolio;
            }
          }

        }

        if (this.getIsUser(resultItem)) {
          if ((resultItem as User).image) {
            const reader = new FileReader();
            const file = await this.filesService.getAvatarFile((resultItem as User).image as string).toPromise();
            
            reader.readAsDataURL(file);
            reader.onload = () => {
              const preview = reader.result as string;
              const filename = item.image;
              
              item.userImage = { preview, original: file, filename };
            }
          }
        }

        return item;
      }));

      this.allData = list;

      this.onFilterChange(this.selectedFilters);
    } catch (error) {
      // TODO: handle error
    }
  }

  getIsUser(item: Job | User) {
    return !!(item as User).name;
  }

  getIsJob(item: Job | User) {
    return !!(item as Job).title;
  }

  containUser() {
    return this.allData.some(d => (d as User).name);
  }

  containJob() {
    return this.allData.some(d => (d as Job).title);
  }

  async getContent(content: string) {
    return await this.filesService.getPortfolioFile(content).toPromise();
  }

  onFilterChange(newValue: Array<string>) {

    const final = [];
    this.selectedFilters = newValue;
    
    if (newValue.includes('JOBS')) {

      if (newValue.includes('IN_PROGRESS')) {
        final.push(...this.allData.filter(data => (data as Job).status?.status === JobStatus.IN_PROGRESS));
      }

      if (newValue.includes('DONE')) {
        final.push(...this.allData.filter(data => (data as Job).status?.status === JobStatus.DONE));
      }

      if (newValue.includes('FREE')) {
        final.push(...this.allData.filter(data => (data as Job).status?.status === JobStatus.FREE));
      }

      if (!newValue.includes('FREE') && !newValue.includes('DONE') && !newValue.includes('IN_PROGRESS')) {
        final.push(...this.allData.filter(data => this.getIsJob(data)));
      }
    }

    if (newValue.includes('USERS')) {
      
      if (newValue.includes('CLIENTS')) {
        final.push(...this.allData.filter(data => !!(data as User).client && (data as User).name));
      }

      if (newValue.includes('COLABORATORS')) {
        final.push(...this.allData.filter(data => !!(data as User).colaborator));
      }

      if (newValue.includes('ADMINISTRATORS')) {
        final.push(...this.allData.filter(data => !!(data as User).admin));
      }

      if (!newValue.includes('CLIENTS') && !newValue.includes('COLABORATORS') && !newValue.includes('ADMINISTRATORS')) {
        final.push(...this.allData.filter(data => this.getIsUser(data)));
      }
    }

    if (!newValue.includes('USERS') && !newValue.includes('JOBS')) {
      final.push(...this.allData);
    }

    this.showData = final;
  }
}
