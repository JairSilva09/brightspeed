import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { ORDERDATA,orderData } from '../models/data.model';
import { Router } from '@angular/router';

export interface DAY {
  frameDate: Date | any;
  selected: boolean;
  utc: any,
  appointments: any[];
}

export interface OPTION {
  appointmentWindowId: string,
  date: string,
  dateOriginalFormat: string,
  from: string,
  to: string,
  utc: any,
  selected: boolean
}

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})
export class MonthlyCalendarComponent implements OnInit {
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDate: Date;
  currentMonth: Date;
  calendarDays: DAY[] = [];
  indexSelected!: number;
  scheduling: any[] = [];
  earthlinkCoreData!: ORDERDATA;
  onStart: any;
  onEnd: any;
  previousAppointmentSelected: any = {};
  currentPage = 'installation'
  loaderOn = false;
  loaderTitle: string = '';
  attempts = 0;

  //-------error-------------//
  ErrorMessage: string = "";
  answerWithError: boolean = false;
  //-------------------------//

  @Input() appointmentsData: any;
  @Output() selectedDateEmit = new EventEmitter<string>();
  @Output() arrayIsEmpty = new EventEmitter<boolean>();

  constructor(private brightSpeedService: BrightSpeedService, private router: Router) {
    this.currentDate = new Date();
    this.currentMonth = new Date()
  }
  getBgColor(i: number): string {
    return i % 2 === 0 ? '#93D500' : '#93D500';
  }

  ngOnInit() {
    this.brightSpeedService.getLocalStorage();
    this.generateCalendar();
    this.brightSpeedService.currentCartForm$.subscribe((data) => {
      this.earthlinkCoreData = data;
      let dataoptions = this.earthlinkCoreData.potentialDates;
      this.getAppointments(dataoptions);
    })
    this.brightSpeedService.setTransactionIdHeaders(this.earthlinkCoreData.transactionId);
  }

  getAppointments(potential: any) {
    this.scheduling = []
    potential.forEach((element: any) => {
      let dateOption = element.scheduleDateOfInstallation;
      const year = dateOption.substring(0, 4);
      const month = dateOption.substring(4, 6);
      const day = dateOption.substring(6, 8);
      const dateFormatted = `${year}-${month}-${day}`;
      const option: OPTION = {
        appointmentWindowId: element.appointmentWindowId,
        date: dateFormatted,
        dateOriginalFormat: element.scheduleDateOfInstallation,
        from: element.scheduleBeginTime,
        to: element.scheduleEndTime,
        utc: new Date(dateFormatted).getTime(),
        selected: element.scheduleDateOfInstallation === this.earthlinkCoreData.appointment.date && element.scheduleBeginTime === this.earthlinkCoreData.appointment.startTime?true:false,
      };
      if (option.selected) {
        this.previousAppointmentSelected = option;
        this.selectedDateEmit.emit("true")
      }
      this.scheduling.push(option)
    })
    this.generateCalendar();
  }

  setRange(range: any) {
    this.loaderOn = true;
    this.onStart = range.rangeFrom;
    this.onEnd = range.rangeTo;
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const totalDays = lastDay.getDate();

    this.calendarDays = [];

    for (let i = 1 - startOffset; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const day: DAY = {
        frameDate: date,
        selected: false,
        utc: "",
        appointments: []
      };

      this.handleDay(day)
      this.calendarDays.push(day);
      this.currentMonth = date;
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  handleDay(day: any) {
    day.appointments = []
    let stringDate
    let stringDay = day.frameDate.getUTCDate().toString().replace(/\b(\d)\b/g, "0$1");
    day.frameDate.getUTCFullYear().toString()
    let stringMonth = day.frameDate.getUTCMonth() + 1
    stringMonth = stringMonth.toString().replace(/\b(\d)\b/g, "0$1");
    stringDate = day.frameDate.getUTCFullYear() + "-" + stringMonth + "-" + stringDay
    day.utc = new Date(stringDate).getTime();

    this.scheduling.forEach((e: any) => {
      if (e.utc === day.utc) {
        day.appointments.push(e);
      }
    })
  }

  selectedDate(appointment: any) {
    if (this.previousAppointmentSelected != appointment) {
      this.previousAppointmentSelected.selected = false;
      appointment.selected = true;
      this.previousAppointmentSelected = appointment;
    }

    this.earthlinkCoreData.appointment.appointmentWindowId = "";
    this.earthlinkCoreData.appointment.date = appointment.dateOriginalFormat;
    this.earthlinkCoreData.appointment.startTime = appointment.from;
    this.earthlinkCoreData.appointment.endTime = appointment.to;
    this.selectedDateEmit.emit("true")
  }
}
