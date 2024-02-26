import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { ORDERDATA,orderData } from '../models/data.model';
import { InfoBilling, ShowingCart } from '../models/models';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss']
})
export class SideCartComponent implements OnInit {
  earthlinkCoreData: ORDERDATA
  
  // showingCart: ShowingCart = {
  //   productInternet: {
  //     PlanName: "",
  //     recurringAmount: "",
  //   },
  //   productVoice: {},
  // }
  // infoBilling: InfoBilling = {
  //   addressLine1: "",
  //   addressLine2: "",
  //   attentionInCareOf: "",
  //   city: "",
  //   state: "",
  //   zipCode:  "",
  // }
  totalMonthly: number = 0;
  totalOnce: number = 0
  transactionIdRequestCounter = 0
  agentId!: string;
   //-------error-------------//
   ErrorMessage: string = "";
   answerWithError: boolean = false;
  constructor(private brightSpeedService: BrightSpeedService, private router: Router,) { 
    this.earthlinkCoreData = orderData;
  }

  ngOnInit(): void {
    this.brightSpeedService.getLocalStorage();
    this.brightSpeedService.currentCartForm$.subscribe((data) => {
      this.earthlinkCoreData = data;
      console.log(this.earthlinkCoreData)
      //this.showingCart = this.earthlinkCoreData.showingCart
      //this.infoBilling = this.earthlinkCoreData.infoBilling
      this.agentId= this.earthlinkCoreData.agentId
      this.brightSpeedService.setTransactionIdHeaders(this.earthlinkCoreData.transactionId);

      if (data.transactionId == '' && this.transactionIdRequestCounter==0) {
        this.transactionIdRequestCounter++        
      }
    });

  }

  resetCart() {

    if (confirm('Are you sure you want to reset your cart?')) {
      localStorage.clear();
      localStorage.setItem('displayCart', 'false')
      const agentId = this.earthlinkCoreData.agentId
      const zip = this.earthlinkCoreData.serviceZip
      const dnis = this.earthlinkCoreData.dnis
      const callKey = ''
      const email = this.earthlinkCoreData.email
      const phone = this.earthlinkCoreData.phone
      const firstName = this.earthlinkCoreData.firstName
      const lastName =  this.earthlinkCoreData.lastName
      const city = this.earthlinkCoreData.serviceCity
      const address = this.earthlinkCoreData.addressLine1
      const state = this.earthlinkCoreData.serviceState
      window.location.replace(`address?firstName=${firstName}&lastName=${lastName}&addressLine1=${address}&address2=&city=${city}&state=${state}&zip=${zip}&agentId=${agentId}&&dnis=${dnis}&ani=&email=${email}&phone=${phone}`);
    }
  }

  changeAddressInfo(template: any) {


    if (template == 'address 1') {
      this.earthlinkCoreData.firstName = 'Cesar'
      this.earthlinkCoreData.lastName = 'Vega'
      this.earthlinkCoreData.email = 'cvega@infsalesgroup.com'
      this.earthlinkCoreData.phone = '3053265854'
      this.earthlinkCoreData.serviceCity = 'Augusta'
      this.earthlinkCoreData.serviceState = 'GA'
      this.earthlinkCoreData.serviceZip = '30904'


    } else if (template == 'address 2') {
      this.earthlinkCoreData.firstName = 'Yanay'
      this.earthlinkCoreData.lastName = 'Viera'
      this.earthlinkCoreData.email = 'Yanay@infsalesgroup.com'
      this.earthlinkCoreData.phone = '7864541245'
      this.earthlinkCoreData.serviceCity = 'Montgomery'
      this.earthlinkCoreData.serviceState = 'AL'
      this.earthlinkCoreData.serviceZip = '35107'

    } else if (template == 'address 3') {
      this.earthlinkCoreData.firstName = 'Milena'
      this.earthlinkCoreData.lastName = 'Fonseca'
      this.earthlinkCoreData.email = 'Fonseca@infsalesgroup.com'
      this.earthlinkCoreData.phone = '30548745478'
      this.earthlinkCoreData.serviceCity = 'FOWLERVILLE'
      this.earthlinkCoreData.serviceState = 'MI'
      this.earthlinkCoreData.serviceZip = '48336'

    } else if (template == 'address 4') {
      this.earthlinkCoreData.firstName = 'Jessell'
      this.earthlinkCoreData.lastName = 'Bassett'
      this.earthlinkCoreData.email = 'Bassett@infsalesgroup.com'
      this.earthlinkCoreData.phone = '5614567895'

      this.earthlinkCoreData.serviceCity = 'Miami'
      this.earthlinkCoreData.serviceState = 'FL'
      this.earthlinkCoreData.serviceZip = '33131'

    }

  }
messages = [
  {
    messageDescription: "Your quoted price includes a Paperless Billing discount of $2.50. If you prefer a paper bill in the mail, you can switch by visiting the Fidium Insider Customer Portal at Fidium.net after your service is installed. If you make the switch to receiving a paper bill you will no longer receive the discount.",
    messageType: "Coaching Tip"
  },
  {
    messageDescription: "Your quoted price includes an Auto-Pay discount of $2.50. Please visit the Fidium Insider Customer Portal after installation to enroll in Auto-Pay to keep this $2.50 discount. This discount will apply to the first full billing cycle after you enroll.",
    messageType: "Coaching Tip"
  }
];
}

