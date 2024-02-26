import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatted'
})
export class DateFormattedPipe implements PipeTransform {

  transform(dateOption: string, ...args: unknown[]): string {
    const anio = dateOption.substring(0, 4);
    const mes = dateOption.substring(4, 6);
    const dia = dateOption.substring(6, 8);
    const dateFormatted = `${anio}-${mes}-${dia}`;

    return dateFormatted;
  }

}
