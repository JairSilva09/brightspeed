import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    const timeParts = value.split(':');
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);

    const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
    const period = hours >= 12 ? 'PM' : 'AM';
    const transformedTime = `${hours % 12}:${formattedMinutes} ${period}`;
    return transformedTime;
  }
}
