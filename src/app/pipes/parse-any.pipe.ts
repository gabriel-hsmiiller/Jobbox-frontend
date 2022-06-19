import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../models/job';
import { User } from '../models/user';

@Pipe({
  name: 'parseAny'
})
export class ParseAnyPipe implements PipeTransform {

  transform(value: Job | User, ...args: unknown[]): any {
    return value as any;
  }

}
