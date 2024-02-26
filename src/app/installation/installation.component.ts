import { Component, OnInit } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';
import {Router} from '@angular/router';
import { ORDERDATA,orderData } from '../models/data.model';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit{

  selectedDate: boolean = false;
  earthlinkCoreData!: ORDERDATA;
  installationPermission:boolean= false
  ErrorMessage: string = "";
  loaderOn = false;
  loaderTitle: string = '';
  answerWithError: boolean = false;
  constructor(private brightSpeedService: BrightSpeedService,private router: Router){}

  ngOnInit(): void {
    this.brightSpeedService.getLocalStorage();
    this.brightSpeedService.CartForm$.subscribe((data) => {
      this.earthlinkCoreData = data;
      this.selectedDate = this.earthlinkCoreData.appointment.appointmentWindowId?true:false;
    })
  }

  isDisabled(): boolean {
    return this.selectedDate;
  }

  previous(){
    this.router.navigate(['billing'])
  }

  refreshPage(){
    window.location.reload();
  }

  continue(){
    this.brightSpeedService.setCartForm(this.earthlinkCoreData);
    //HARD CODE
    this.loaderOn = true;
    this.loaderTitle = ''
    setTimeout(() => {      
    this.loaderOn = false;
    this.router.navigate(['recap']);
    }, 3000);
    ///// END HARD CODE /////////
    //this.router.navigate(['recap'])
  }
}

