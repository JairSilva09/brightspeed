import { Component,Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {

  @Output() setRange = new EventEmitter();

  maxDate: Date;
  minDate: Date;

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  range = {
    rangeFrom: "",
    rangeTo : ""
  }

  constructor() {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  onDateRangeChange(event: any) {
    const startDate = event.start;
    const endDate = event.end;
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.range.rangeFrom = event.value ? event.value.toISOString() : '';
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    this.range.rangeTo = event.value ? event.value.toISOString() : '';
    if(event.value != null){
      this.setRange.emit(this.range);
    }
  }

}
