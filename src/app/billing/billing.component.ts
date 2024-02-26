import { Component, OnInit } from '@angular/core';
import { ORDERDATA,orderData } from '../models/data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { formValidationVariables, filterEmail } from '../service/validations';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  earthlinkCoreData!: ORDERDATA
  //-------------------------//
  portNumber: boolean = false;
  carrierName: string = '';
  carrierPhoneNumber: string = '';
  carrierAccountNumber: string = '';
  //---------------------//
  answer: string = "";
  safeAnswer: string = "";
  loaderOn = false;
  loaderTitle: string = '';
  //-------error-------------//
  ErrorMessage: string = "";
  answerWithError: boolean = false;

  //---------Validation----------//

  validators: any
  filterEmailValidator:any
  constructor(private brightSpeedService: BrightSpeedService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.validators = formValidationVariables;
    this.brightSpeedService.getLocalStorage();
    this.brightSpeedService.currentCartForm$.subscribe((data) => {
      this.earthlinkCoreData = data;
     
    })
    this.earthlinkCoreData.assignNewNumber = 'Yes';
    this.earthlinkCoreData.portPhoneNumber = '1234567890',
    this.earthlinkCoreData.portCarrierName = 'AT&T',
    this.earthlinkCoreData.portAccount = '1234567',
    this.earthlinkCoreData.showingCart.productInternet.planName = '';
    // additional billing
    this.earthlinkCoreData.additinalBillingInfo.isWirelessCarrier = 'Yes';
    this.earthlinkCoreData.additinalBillingInfo.wirelessAccountPIN = "1234"
    this.earthlinkCoreData.additinalBillingInfo.nameAsAppearsOnBill = "billy"
    this.earthlinkCoreData.additinalBillingInfo.addressForWirelessCarrier = "address"
    this.earthlinkCoreData.additinalBillingInfo.isBillAddSameAsSvcAdd = "No"
   

  }

  setBillingAddressForm(event: any) {
    if (event.checked) {
      this.earthlinkCoreData.infoBilling.addressLine1 = this.earthlinkCoreData.addressLine1
      this.earthlinkCoreData.infoBilling.addressLine2 = this.earthlinkCoreData.addressLine2
      this.earthlinkCoreData.infoBilling.city = this.earthlinkCoreData.serviceCity;
      this.earthlinkCoreData.infoBilling.state = this.earthlinkCoreData.serviceState;
      this.earthlinkCoreData.infoBilling.zipCode = this.earthlinkCoreData.serviceZip;
    } else {
      this.earthlinkCoreData.infoBilling.addressLine1 = ""
      this.earthlinkCoreData.infoBilling.addressLine2 = ""
      this.earthlinkCoreData.infoBilling.city = ""
      this.earthlinkCoreData.infoBilling.state = ""
      this.earthlinkCoreData.infoBilling.zipCode = ""
    }
  }

  setContactAddressForm(event: any) {
    if (event.checked) {
      this.earthlinkCoreData.infoContact.firstName = this.earthlinkCoreData.firstName
      this.earthlinkCoreData.infoContact.lastName = this.earthlinkCoreData.lastName
      this.earthlinkCoreData.infoContact.phoneNumber = this.earthlinkCoreData.phone;
      this.earthlinkCoreData.infoContact.emailAddress = this.earthlinkCoreData.email;
    } else {
      this.earthlinkCoreData.infoContact.firstName = "";
      this.earthlinkCoreData.infoContact.lastName = "";
      this.earthlinkCoreData.infoContact.phoneNumber = "";
      this.earthlinkCoreData.infoContact.emailAddress = "";
    }
  }

  setInstallationContactForm(event: any) {
    if (event.checked) {
      this.earthlinkCoreData.installationContact.firstName = this.earthlinkCoreData.firstName
      this.earthlinkCoreData.installationContact.lastName = this.earthlinkCoreData.lastName
      this.earthlinkCoreData.installationContact.phoneNumber = this.earthlinkCoreData.phone;
      this.earthlinkCoreData.installationContact.emailAddress = this.earthlinkCoreData.email;
    } else {
      this.earthlinkCoreData.installationContact.firstName = ""
      this.earthlinkCoreData.installationContact.lastName = ""
      this.earthlinkCoreData.installationContact.phoneNumber = ""
      this.earthlinkCoreData.installationContact.emailAddress = ""
    }
  }

  getOptionalDates() {
    this.loaderOn = true;
    this.loaderTitle = 'Getting Optional Dates'
    let objectData = {
      "agentName": this.earthlinkCoreData.agentId,
      "caseId": this.earthlinkCoreData.caseId,
      "market": this.earthlinkCoreData.market,
      "ifMatch": this.earthlinkCoreData.ifMatch,
      "customerFirstName": this.earthlinkCoreData.firstName,
      "customerLastName": this.earthlinkCoreData.lastName,
      "customerDetailsUpdate": "Yes",
      "dueDate": "20230818",
      "canBeReached": "3052467895",
      "phoneType": this.earthlinkCoreData.infoContact.phoneType,
      "emailAddress": this.earthlinkCoreData.email,
      "selectedInternetPlan": this.earthlinkCoreData.showingCart.productInternet.planName,
      "selectedPhonePlan": this.earthlinkCoreData.showingCart.productVoice.planName,
      "assignNewNumber": this.earthlinkCoreData.assignNewNumber,
      "portingDetails": {
        "phoneNumber": this.earthlinkCoreData.portPhoneNumber,
        "carrier": this.earthlinkCoreData.portCarrierName,
        "carrierAccountNumber": this.earthlinkCoreData.portAccount
      },
      "isWirelessCarrier": this.earthlinkCoreData.additinalBillingInfo.isWirelessCarrier,
      "wirelessAccountPIN": this.earthlinkCoreData.additinalBillingInfo.wirelessAccountPIN,
      "nameAsAppearsOnBill": this.earthlinkCoreData.additinalBillingInfo.nameAsAppearsOnBill, //The name on the wireless billing account
      "addressForWirelessCarrier": this.earthlinkCoreData.additinalBillingInfo.addressForWirelessCarrier,
      "isBillAddSameAsSvcAdd": this.earthlinkCoreData.additinalBillingInfo.isBillAddSameAsSvcAdd,
      "addresses": {
        "billing": {
          "addressLine1": this.earthlinkCoreData.infoBilling.addressLine1,
          "addressLine2": this.earthlinkCoreData.infoBilling.addressLine2,
          "attentionInCareOf": this.earthlinkCoreData.infoBilling.attentionInCareOf,
          "city": this.earthlinkCoreData.infoBilling.city,
          "state": this.earthlinkCoreData.infoBilling.state,
          "zipCode": this.earthlinkCoreData.infoBilling.zipCode
        }
      },
      "contacts": {
        "authorizedContactList": {
          "firstName": this.earthlinkCoreData.infoContact.firstName,
          "lastName": this.earthlinkCoreData.infoContact.lastName,
          "phoneNumber": this.earthlinkCoreData.infoContact.phoneNumber,
          "phoneType": this.earthlinkCoreData.infoContact.phoneType,
          "emailAddress": this.earthlinkCoreData.infoContact.emailAddress
        },
        "installationContact": {
          "firstName": this.earthlinkCoreData.installationContact.firstName,
          "lastName": this.earthlinkCoreData.installationContact.lastName,
          "phoneNumber": this.earthlinkCoreData.installationContact.phoneNumber,
          "phoneType": this.earthlinkCoreData.installationContact.phoneType,
          "emailAddress": this.earthlinkCoreData.installationContact.emailAddress,
          "specialInstruction": this.earthlinkCoreData.installationContact.specialInstruction
        }
      },
      "safeGuardDetails": {
        "cpnipin": this.earthlinkCoreData.safeGuardDetails.cpniPIN,
        "id": this.earthlinkCoreData.safeGuardDetails.id,
        "question": this.earthlinkCoreData.safeGuardDetails.question,
        "answer": this.earthlinkCoreData.safeGuardDetails.answer
      }
    }
    this.brightSpeedService.getTimeSlots(objectData).subscribe({
      next: (data: any) => {
        this.loaderOn = false;
        if ('response' in data && 'appointments' in data.response) {
          this.earthlinkCoreData.potentialDates = data.response.appointments;
          this.earthlinkCoreData.ifMatch = data.eTag;
          this.brightSpeedService.setCartForm(this.earthlinkCoreData);
          this.router.navigate(['installation']);
        } else {
          this.earthlinkCoreData.ifMatch = data.eTag;
          this.brightSpeedService.setCartForm(this.earthlinkCoreData);
          this.router.navigate(['recap']);

        }
      },
      error: (error: any) => {
        console.error("Error in getTimeSlots call:", error);
        this.loaderOn = false;

        if ('error' in error && 'messages' in error.error) {
          this.ErrorMessage = error.error.messages[0].messageDescription;
        } else {
          this.ErrorMessage = error.message;
        }
        this.answerWithError = true;
      },
      complete: () => {
      }
    });
  }
  questionSelected() {
    let question: any = this.earthlinkCoreData.securityQuestionsList.find(x => x.id === this.answer);
    this.earthlinkCoreData.safeGuardDetails.id = question.id;
    this.earthlinkCoreData.safeGuardDetails.question = question.question;
  }
  previous() {
    this.router.navigate(['products'])
  }

  setPortability(event: any) {
    if (event.checked) {
      this.earthlinkCoreData.assignNewNumber = 'No';
      this.earthlinkCoreData.portPhoneNumber = ''
      this.earthlinkCoreData.portCarrierName = ''
      this.earthlinkCoreData.portAccount = ''
      //----------additional billing------//
      this.earthlinkCoreData.additinalBillingInfo.isWirelessCarrier = '';
      this.earthlinkCoreData.additinalBillingInfo.wirelessAccountPIN = ""
      this.earthlinkCoreData.additinalBillingInfo.nameAsAppearsOnBill = ""
      this.earthlinkCoreData.additinalBillingInfo.addressForWirelessCarrier = ""
      this.earthlinkCoreData.additinalBillingInfo.isBillAddSameAsSvcAdd = ""
    } else {
      this.earthlinkCoreData.portPhoneNumber = '1234567890',
      this.earthlinkCoreData.portCarrierName = 'AT&T',
      this.earthlinkCoreData.portAccount = '1234567',
      this.earthlinkCoreData.assignNewNumber = 'Yes';
      //----------additional billing------//
      this.earthlinkCoreData.additinalBillingInfo.isWirelessCarrier = 'Yes';
      this.earthlinkCoreData.additinalBillingInfo.wirelessAccountPIN = "1234"
      this.earthlinkCoreData.additinalBillingInfo.nameAsAppearsOnBill = "billy"
      this.earthlinkCoreData.additinalBillingInfo.addressForWirelessCarrier = "address"
      this.earthlinkCoreData.additinalBillingInfo.isBillAddSameAsSvcAdd = "No"
    }
    this.portNumber = event.checked;
  }

  validateEmail(email: any){
    return filterEmail(email)
  }

  isNextButtonDisabled() {
    return !(this.validators.areAllConditionsValid(this.earthlinkCoreData));
  }

  next() {
    this.earthlinkCoreData.portability = this.portNumber;
    this.earthlinkCoreData.safeGuardDetails.answer = this.safeAnswer;
     //HARD CODE
     this.loaderOn = true;
     this.loaderTitle = 'Getting Optional Dates'
     setTimeout(() => {      
     this.loaderOn = false;
     this.router.navigate(['installation']);
     }, 3000);
     ///// END HARD CODE /////////
    //this.getOptionalDates();
  }

}
