import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORDERDATA} from '../models/data.model';
import { BrightSpeedService } from '../service/brightSpeed.service';  
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})

export class RecapComponent implements OnInit {

  earthlinkCoreData!: ORDERDATA;
  sumTotal: number = 0;
  currentPage = 'recap';
  order: any
  loaderOn = false;
  loaderTitle: string = '';
  agreeDisclosure: boolean = false;
  setOrderButton = false;
  createOrderButton = false;
  creatingTransactionButton = true;
  makePaymentButton = false;
  carrierData: any
  formattedDateTimeRange: any;
  ErrorMessage: string = "";
  answerWithError: boolean = false;
  IfOfficeHours: boolean = false
  IfFidiumShieldPremium: boolean = false
  IfFidiumSteam: boolean = false
  IfFidiumVoice: boolean = false
  durationObject: any
  giftCardApplied = false;
  readGiftCardDisclosure = false;
  constructor(private brightSpeedService: BrightSpeedService, private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.brightSpeedService.getLocalStorage();

    this.brightSpeedService.currentCartForm$.subscribe((data) => {
      this.earthlinkCoreData = data;
      this.brightSpeedService.setTransactionIdHeaders(this.earthlinkCoreData.transactionId);

    })

  }

  applyGiftCard() {
    if (this.earthlinkCoreData.isgGiftCardResponse && this.earthlinkCoreData.selectedIsgRewards) {
      let date1 = this.earthlinkCoreData.appointment.date
      let hour1 = this.earthlinkCoreData.appointment.startTime
      while (hour1.length < 4) {
          hour1 = "0" + hour1;
      }
      let dateISO8601 = date1.slice(0, 4) + "-" + date1.slice(4, 6) + "-" + date1.slice(6) + "T" +hour1.slice(0, 2) + ":" + hour1.slice(2, 4) + ":00";
      this.brightSpeedService.tokenCall().subscribe({
        next: (data: any) => {
          let USADate = new Date(dateISO8601).toLocaleString("en-US", {timeZone: "America/New_York"});
          let installDate = this.datePipe.transform(USADate, 'MM/dd/yyyy');

          const applyGiftCardPayload = {
            "firstName": this.earthlinkCoreData.firstName,
            "lastName": this.earthlinkCoreData.lastName,
            "addressLine1": this.earthlinkCoreData.addressLine1,
            "city": this.earthlinkCoreData.serviceCity,
            "state": this.earthlinkCoreData.serviceState,
            "country": "US",
            "zip": this.earthlinkCoreData.serviceZip,
            "phoneNumber": this.earthlinkCoreData.phone,
            "emailAddress": this.earthlinkCoreData.email,
            "offer": "Gift" + this.earthlinkCoreData.isgGiftCard,
            // "accountNumber": this.newData.billingAccountId,
            "accountNumber": "5000401651",
            "resellerName": "Fidium",
            "installDate": installDate, // Format m/d/Y
            "amount":"100",
            "cardType": "Visa",
            "requestType": "Voucher Creation",
            "agentId": this.earthlinkCoreData.agentId,
            "accountStatus": "Status"
          };

          this.loaderOn = true;
          this.loaderTitle = 'Get Gift Card'
          this.brightSpeedService.applyGiftCard(applyGiftCardPayload, data.token).subscribe({
            next: (response: any) => {
              this.loaderOn = false;
              this.brightSpeedService.setCartForm(this.earthlinkCoreData);
              this.router.navigate(['confirmation']);
            },
            error: (error: any) => {
              console.error("Error applying gift card:", error);
              this.ErrorMessage = error.error.message;
              this.loaderOn = false;
              this.answerWithError = true;
              this.brightSpeedService.setCartForm(this.earthlinkCoreData);
            },
            complete: () => {
            }
          });
        },error: (error: any) => {
          console.error("Error token:", error);
          this.ErrorMessage = error.error.message;
          this.loaderOn = false;
          this.answerWithError = true;
          this.brightSpeedService.setCartForm(this.earthlinkCoreData);
        }
      });
    }else{
      this.answerWithError = true;
      this.ErrorMessage = "Gift card already applied";
      this.giftCardApplied = true;
      this.brightSpeedService.setCartForm(this.earthlinkCoreData);
      this.router.navigate(['confirmation']);
    }

  }

  submitOrder(){
    let orderData

    if(this.earthlinkCoreData.assignNewNumber === "No"){
      this.earthlinkCoreData.appointment.date = "20230827"
      this.earthlinkCoreData.appointment.startTime= "1700"
      orderData = {
        "agentName": this.earthlinkCoreData.agentId,
        "caseId": this.earthlinkCoreData.caseId,
        "market": this.earthlinkCoreData.market,
        "ifMatch": this.earthlinkCoreData.ifMatch,
        //,"salesReconciliationId":"" //No required
        "appointmentWindowId": "2681",
        "scheduleBeginTime": this.earthlinkCoreData.appointment.startTime,
        "scheduleDateOfInstallation": this.earthlinkCoreData.appointment.date,
        "scheduleEndTime": "1900"
      }
    }else{
      orderData = {
        "agentName": this.earthlinkCoreData.agentId,
        "caseId": this.earthlinkCoreData.caseId,
        "market": this.earthlinkCoreData.market,
        "ifMatch": this.earthlinkCoreData.ifMatch,
        "appointmentWindowId":this.earthlinkCoreData.appointment.appointmentWindowId,
        "scheduleBeginTime": this.earthlinkCoreData.appointment.startTime,
        "scheduleDateOfInstallation": this.earthlinkCoreData.appointment.date,
        "scheduleEndTime": this.earthlinkCoreData.appointment.endTime
        //,"salesReconciliationId":"" //No required
      }
    }

    this.loaderOn = true;
    this.loaderTitle = "Creating order";
     //HARD CODE
     setTimeout(() => {      
     this.loaderOn = false;
     this.router.navigate(['confirmation']);
     }, 3000);
     ///// END HARD CODE /////////
    // this.brightSpeedService.submitOrder(orderData).subscribe({
    //   next: (data: any) => {
    //     this.applyGiftCard();
    //     this.ErrorMessage = data.messages[0].messageDescription;
    //     this.loaderOn = false;
    //     this.answerWithError = true;
    //   },
    //   error: (error:any)=>{
    //     console.error("Error in Payment Transaction call:", error.message);
    //     this.loaderOn = false;
    //     this.ErrorMessage = error.message;
    //     this.answerWithError = true;
    //   },
    //   complete:()=>{

    //   }
    // })
  }
}
