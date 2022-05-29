import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {

    const ddd = value.toString().substring(0,2);
    const part1 = value.toString().substring(2,7);
    const part2 = value.toString().substring(7);

    const formatted = `(${ddd}) ${part1}-${part2}`

    return value.toString().length > 0 ? formatted : '';
  }

}
