import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../models/job';
import { User } from '../models/user';

@Pipe({
  name: 'parseUser'
})
export class ParseUserPipe implements PipeTransform {

  transform(value: Job | User, ...args: unknown[]): User {
    return value as User;
  }

}
