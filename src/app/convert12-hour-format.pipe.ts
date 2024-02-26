import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert12HourFormat'
})
export class Convert12HourFormatPipe implements PipeTransform {

  transform(hour24: string, ...args: unknown[]): string {
    let hour;
    let minutes;
    if(hour24.length>3){
      hour = parseInt(hour24.substring(0, 2));
      minutes = hour24.substring(2);
    }else{
      hour = parseInt(hour24.substring(0, 1));
      minutes = hour24.substring(1);
    }

    let time = "AM";

    if (hour >= 12) {
      time = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }

    if (hour === 0) {
      hour = 12;
    }
    return `${hour}:${minutes.padStart(2, '0')} ${time}`;
  }
}
