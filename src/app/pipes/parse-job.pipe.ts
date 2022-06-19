import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../models/job';
import { User } from '../models/user';

@Pipe({
  name: 'parseJob'
})
export class ParseJobPipe implements PipeTransform {

  transform(value: Job | User, ...args: unknown[]): Job {
    return value as Job;
  }

}
