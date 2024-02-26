import { Component, OnInit, ViewChild,isDevMode } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ORDERDATA,orderData } from '../models/data.model';
import { CUSTOMER_MULTI_ADDRESS } from '../mock-data';

import { validateEmpty, validatePhone, validateEmail } from '../service/validations';
//import { LoginService } from '../service/login.service';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  earthlinkCoreData: ORDERDATA = orderData;
  loadingData: boolean = false;
  loaderTitle: string = '';
  loaderOn = false;
  options: any;

  latitude: any;
  longitude: any;
  city: any;
  state: string = "";
  zipcode: any;
  salesAgreement: string = "";

  //-------------- test --------------------//
  TEST: any[] = [];
  selectedAddress: any
  selectedApt: any
  selectedCity: any
  selectedState = 'Choose state'
  selectedZip: any;
  //--------------------------------------//
  nextButtonEnabled: boolean = false;
  numberRequired: number = 8;
  REQUIRED: string[] = ["first-name", "last-name", "street-address", "city", "state", "zip", "email","phone"];
  messagePhone: string = "";
  messageEmail: string = "";

  //-------error-------------//
  ErrorMessage: string = "";
  answerWithError: boolean = false;
  //-------------------------//
  jsonString = '';
  isZipTouched: boolean = false;
  isFirstNameTouched: boolean = false;
  isLastNameTouched: boolean = false;
  isEmailTouched: boolean = false;
  isAddressTouched: boolean = false;
  isCityTouched: boolean = false;
  isStateTouched: boolean = false;
  isPhoneTouched: boolean = false;
  isCurrentCustomer: boolean = false;
  displayModal: string = "none";
  eligibleAddresses: any[]= [];
  giftCardApplied: boolean = false;
  allowedSuffix: boolean = true;
  allowNextButton: boolean = false;

  //============ data ===================//
  currentCustomer: string = "";
  emailDrip: false = false;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone: string = "";
  secondaryPhone: string = "";
  addressLine1: string = "";
  serviceApt: string = "";
  serviceCity: string = "";
  serviceState: string = "";
  serviceSuffix: string = "";
  serviceZip: string = "";
  selectedOptions = {};
  dnis: string = "";
  agentId: string = "";
  callkey: string = "";
  uuid: string = "";

  constructor(private brightSpeedService: BrightSpeedService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.options = {
      componentRestrictions: { country: 'US' },
    };
    this.brightSpeedService.currentCartForm$.subscribe((data: ORDERDATA) => {
      this.earthlinkCoreData = data;
      this.allowedSuffix = this.filterEmail(data.email);
      this.messageEmail = this.allowedSuffix ? '' : 'Email not allowed';

    });

    this.currentCustomer = "false";
    this.emailDrip = false;

    if (this.earthlinkCoreData.transactionId === "") {
      this.activatedRoute.queryParams.subscribe((params: any) => {
        this.earthlinkCoreData.firstName = this.firstName = params['firstName']? params['firstName']: this.firstName;
        this.earthlinkCoreData.lastName = this.lastName = params['lastName']? params['lastName']: this.lastName;
        this.earthlinkCoreData.email = this.email = params['email'] ? params['email'] : this.email;
        this.earthlinkCoreData.phone = this.phone = params['phone'] ? params['phone'] : this.phone;
        this.earthlinkCoreData.secondaryPhone = this.secondaryPhone = params['secondaryPhone'] ? params['secondaryPhone'] : this.secondaryPhone;
        this.earthlinkCoreData.addressLine1 = this.addressLine1 = params['addressLine1'] ? params['addressLine1'] : this.addressLine1;
        this.earthlinkCoreData.addressLine2 = this.serviceApt = params['address2']? params['address2']: this.serviceApt;
        this.earthlinkCoreData.serviceCity = this.serviceCity = params['city'] ? params['city'] : this.serviceCity;
        this.serviceSuffix = params['suffix']? params['suffix']: this.serviceSuffix;
        this.earthlinkCoreData.serviceState = this.serviceState = params['state'] ? params['state'] : this.serviceState;
        this.earthlinkCoreData.serviceZip = this.serviceZip = params['zip'] ? params['zip'] : this.serviceZip;
        this.selectedOptions = this.selectedOptions ? this.selectedOptions : {}
        this.earthlinkCoreData.dnis = this.dnis = params['dnis'] ? params['dnis'] : this.dnis;
        this.earthlinkCoreData.agentId = this.agentId = params['agentId'] ? params['agentId'] : this.agentId;
        this.callkey = params['callkey']? params['callkey']: this.callkey;
      });

      let transactionPayload = {
        "agent_id": this.earthlinkCoreData.agentId,
        "agentId": this.earthlinkCoreData.agentId,
        "partner": "fidium",
        "params": {
          "gc": 1,
          "dnis": this.earthlinkCoreData.dnis,
          "callKey": this.callkey
        }
      }
      this.loadingData = false;
      this.loaderTitle = 'Creating Transaction'
      this.brightSpeedService.createAWSTransaction(transactionPayload).subscribe({
        next: (data: any) => {
          let transactionId = data.uuid;
          this.earthlinkCoreData.transactionId = transactionId;
          this.brightSpeedService.setTransactionIdHeaders(transactionId);
          this.loadingData = false;
        },
        error: (error: any) => {
          console.error("Error in createTransaction call:", error);
          this.ErrorMessage = "Transaction Error";
          this.loaderOn = false;
          this.answerWithError = true;
        },
        complete: () => {
          //("createTransaction call completed.");
        }
      });
    } else {
      this.earthlinkCoreData.transactionId = this.earthlinkCoreData.transactionId;
    }
    // get Token
    let userAndPwd = {
      "email": environment.email,
      "password": environment.password
    }
    // this.loginService.doLogin(userAndPwd).subscribe({
    //   next: (response: any) => {
    //     if (response && response.token) {
    //       localStorage.setItem('token', response.token);
    //       localStorage.setItem('refresh_token', response.refresh_token);
    //       this.brightSpeedService.setCartForm(this.earthlinkCoreData);
    //       let marketingInfoPayload = {
    //         "dnis": this.earthlinkCoreData.dnis,
    //         "provider": "Viasat",
    //         "return_full_json": "1"
    //       }
    //       this.loadingData = false;
    //       this.loaderTitle = 'Get Marketing Info'
    //       this.brightSpeedService.marketingInfoSaleCode(marketingInfoPayload).subscribe({
    //         next: (salescode: any) => {
    //           this.earthlinkCoreData.isgGiftCard = JSON.parse(salescode.data.salecode).hasOwnProperty('gc') ? JSON.parse(salescode.data.salecode).gc : '0';
    //           if (salescode) {
    //             if (this.earthlinkCoreData.isgGiftCard != "0") {
    //               this.giftCardApplied = true;
    //               this.earthlinkCoreData.isgGiftCardResponse = true;
    //             }else{
    //               this.giftCardApplied = false;
    //               this.earthlinkCoreData.isgGiftCardResponse = false;
    //             }
    //           }
    //         },
    //         error: (error: any) => {
    //           console.error("Error in marketingInfoSaleCode call:", error);
    //           this.ErrorMessage = error.error.message;
    //           this.loaderOn = false;
    //           this.answerWithError = true;
    //         },
    //         complete: () => {
    //           //("marketingInfoSaleCode call completed.");
    //         }
    //       });

    //     } else {

    //       if (response.error) {
    //         this.ErrorMessage = response.error.error.message;
    //         this.loaderOn = false;
    //         this.answerWithError = true;
    //         return response.error;
    //       }
    //     }
    //   },
    //   error: (error: any) => {
    //     console.error("Error in doLogin call:", error);
    //     this.ErrorMessage = "Unknown Error";
    //     this.loaderOn = false;
    //     this.answerWithError = true;
    //   },
    //   complete: () => {
    //     //("doLogin call completed.");
    //   }
    // });
  }

  areAllConditionsValid(): boolean {
    return (
      this.firstName != '' &&
      this.lastName != '' &&
      this.email != '' &&
      this.addressLine1 != '' &&
      this.serviceCity != '' &&
      this.serviceState != '' &&
      this.serviceZip != '' &&
      this.phone != ''

    );
  }

  isNextButtonDisabled() {
    this.validateEmail()
    this.allowNextButton = !(this.areAllConditionsValid() && this.allowedSuffix );
    return this.allowNextButton
  }

  onFirstNameBlur() {
    this.isFirstNameTouched = true;
  }

  onLastNameBlur() {
    this.isLastNameTouched = true;
  }

  validateEmail() {
    let email: string = this.email;
    this.allowedSuffix = this.filterEmail(email);
    this.messageEmail = this.allowedSuffix ? '' : 'Email not allowed';
  }

  onEmailBlur() {
    this.validateEmail()
    this.isEmailTouched = true;
  }

  onPhoneTouched() {
    this.isPhoneTouched = true;
  }

  onAddressBlur() {
    this.isAddressTouched = true;
  }
  onCityBlur() {
    this.isCityTouched = true
  }
  onStateBlur() {
    this.isStateTouched = true
  }
  onZipBlur() {
    this.isZipTouched = true
  }
  submitData() {
    //HARD CODE
    // this.loaderOn = true;
    // this.loaderTitle = 'Getting Products'
    // setTimeout(() => {      
    // this.loaderOn = false;
    // this.router.navigate(['products']);
    // let respAddress = CUSTOMER_MULTI_ADDRESS;
    //     this.analyzeResAddress(respAddress);
    // }, 3000);
    ///// END HARD CODE /////////
    this.loaderTitle = 'Getting Products'
    this.loaderOn = true;
    this.router.navigate(['products']);
    this.earthlinkCoreData.firstName = this.firstName;
    this.earthlinkCoreData.lastName = this.lastName;
    this.earthlinkCoreData.email = this.email;
    this.earthlinkCoreData.phone = this.phone;
    this.earthlinkCoreData.secondaryPhone = this.secondaryPhone;
    this.earthlinkCoreData.addressLine1 = this.addressLine1;
    this.earthlinkCoreData.addressLine2 = this.serviceApt;
    this.earthlinkCoreData.serviceCity = this.serviceCity;
    this.earthlinkCoreData.serviceState = this.serviceState;
    this.earthlinkCoreData.serviceZip = this.serviceZip;
    this.earthlinkCoreData.dnis = this.dnis;

    //this.getProducts();
  }

  closeModal() {
    this.displayModal = "none";
  }

  analyzeResAddress(resp: any){

    if(resp.response.eligibleAddresses.length > 1){
      console.log(resp.response.eligibleAddresses)
      //MULTI ADDRESSES
      this.eligibleAddresses = resp.response.eligibleAddresses;
      this.displayModal = "block";
      this.loaderOn = false;
    }else{
      let object = {
        "agentName": this.earthlinkCoreData.agentId,
        "caseId": this.earthlinkCoreData.caseId,
        "ifMatch": this.earthlinkCoreData.ifMatch,
        "controlNumber": this.earthlinkCoreData.controlNumber,
        "market": this.earthlinkCoreData.market,
        "productType": this.earthlinkCoreData.productType // 'INTERNET', 'VOICE' or null
      }
      this.brightSpeedService.getCheckEligibility(object).subscribe({
        next: (data: any) => {
          this.loaderOn = false;
          if (data.messages.length && data.messages[0].messageDescription != "The API returned Success Message") {
            this.ErrorMessage = data.messages[0].messageDescription
            this.answerWithError = true;
          }else{
            this.earthlinkCoreData.products.internetPlans = data.response.internetPlansList;
            this.earthlinkCoreData.securityQuestionsList = data.response.securityQuestionsList;
            this.earthlinkCoreData.ifMatch = data.eTag;
            this.brightSpeedService.setCartForm(this.earthlinkCoreData);
            this.router.navigate(['products']);
          }
        },
        error: (error: any) => {
          console.error("Error in getCheckEligibility call:", error);
          this.ErrorMessage = error.error.message;
          this.loaderOn = false;
          this.answerWithError = true;
        },
        complete: () => {

        }
      });
    }
  }

  updateInputs(value?: string) {
    let testValues: any
    testValues = this.TEST.find(res => res.title == value)
    this.earthlinkCoreData.firstName = this.firstName = testValues?.firstName
    this.earthlinkCoreData.lastName = this.lastName = testValues?.lastName
    this.earthlinkCoreData.email = this.email = testValues?.email
    this.earthlinkCoreData.phone = this.phone = testValues?.phone
    this.addressLine1 = this.earthlinkCoreData.addressLine1 = testValues?.address
    this.serviceApt = testValues?.apt
    this.earthlinkCoreData.serviceCity = this.serviceCity = testValues?.city
    this.earthlinkCoreData.serviceState = this.serviceState = testValues?.state
    this.earthlinkCoreData.serviceZip = this.serviceZip = testValues?.zip

    if (value != "") {
      //this.earthlinkCoreData.fieldAddressRequired = this.REQUIRED;
    } else {
      this.REQUIRED = [];
      //this.earthlinkCoreData.fieldAddressRequired = this.REQUIRED;
      this.nextButtonEnabled = false;
    }
  }

  validateField(event: any) {
    if (!validateEmpty(event.value)) {
      if (this.REQUIRED.indexOf(event.name) != -1) {
        this.REQUIRED.splice(this.REQUIRED.indexOf(event.name), 1);
      }
    } else {
      if (this.REQUIRED.indexOf(event.name) === -1) {
        this.REQUIRED.push(event.name);
      }
    }
    if (this.REQUIRED.length !== this.numberRequired) {
      this.nextButtonEnabled = false;
    }
    //this.earthlinkCoreData.fieldAddressRequired = this.REQUIRED;

    if (event.name === "email" && event.value != '') {
      this.validateFiledEmail(event);
    } else {
      this.messageEmail = '';
    }
  }

  validateFiledPhone(event: any) {
    this.messagePhone = validatePhone(event.value)
    if (this.messagePhone !== '' || this.REQUIRED.length !== this.numberRequired) {
      this.nextButtonEnabled = false;
    }
  }

  validateFiledEmail(event: any) {
    if (event.value != '') {
      this.messageEmail = validateEmail(event.value)
      if (this.messageEmail !== '' || this.REQUIRED.length !== this.numberRequired) {
        this.nextButtonEnabled = false;
      }
    }
  }

  setCurrentCustomerValue() {
    this.isCurrentCustomer = this.currentCustomer ===  "false";
    if (this.isCurrentCustomer && this.areAllConditionsValid()) {
      this.nextButtonEnabled = true;
    }
  }

  setEmailDrip(value: any) {
    this.emailDrip = value;
    if (this.emailDrip !== undefined && this.areAllConditionsValid()) {
      this.nextButtonEnabled = true;
    }
  }

  parseGoogleAddress(address: any): any {
    //(address)
    let streetName = '',
      streetNumber = '',
      city = '',
      stateProvince = '',
      zipCode = '';

    const addressComponents = address.address_components;

    let lat = address.geometry.location.lat();
    let lng = address.geometry.location.lng();

    for (const component of addressComponents) {
      const type = component.types[0];
      switch (type) {
        case 'route':
          streetName = component.short_name;
          break;
        case 'street_number':
          streetNumber = component.long_name;
          break;
        case 'postal_code':
          zipCode = component.long_name;
          break;
        case 'locality':
          city = component.long_name;
          break;
        case 'administrative_area_level_1':
          stateProvince = component.short_name;
          break;
      }
    }
    const addressLine1 = `${streetNumber} ${streetName}`;
    return {
      addressLine1,
      city,
      zipCode,
      stateProvince,
      lat,
      lng,
    };
  }

  getProducts(){
    let object =  {
      "agentName": this.earthlinkCoreData.agentId,
      "addressLine1": this.earthlinkCoreData.addressLine1,
      "addressLine2": this.earthlinkCoreData.addressLine2,
      "city": this.earthlinkCoreData.serviceCity,
      "state": this.earthlinkCoreData.serviceState,
      "zipCode": this.earthlinkCoreData.serviceZip
    }
    this.loaderOn = true;
    this.answerWithError = false;

    this.brightSpeedService.geoAddress(object).subscribe({
      next: (data: any) => {
        this.earthlinkCoreData.caseId = data.ID;
        this.earthlinkCoreData.ifMatch = data.eTag;
        let addresses = data.response.eligibleAddresses;
        if(addresses !== undefined && addresses !== null && addresses.length ){

          let address = addresses[(Math.floor(Math.random() * addresses.length))];
          this.earthlinkCoreData.controlNumber = address.controlNumber;
          this.earthlinkCoreData.market = address.market;
          this.earthlinkCoreData.productType = null;
        }
        let respAddress = data
        this.analyzeResAddress(respAddress);
      },
      error: (error: any) => {
        this.loaderOn = false;
        console.error("Error in geoAddress call:", error);
        if(error.error.messages.length){
          this.answerWithError = true;
          this.ErrorMessage = error.error.messages[0].messageDescription;
        }
      },
      complete: () => {

      }
    });
  }

  setAddress(address: any){
    this.closeModal();
    this.earthlinkCoreData.addressLine1 = address.addressLine1;
    this.earthlinkCoreData.addressLine2 = address.addressLine2;
    this.earthlinkCoreData.controlNumber = address.controlNumber;
    this.earthlinkCoreData.serviceCity = address.locality;
    this.earthlinkCoreData.market = address.market;
    this.earthlinkCoreData.serviceZip = address.zipCode;
    this.earthlinkCoreData.serviceState = address.state;
    this.getProducts();
  }

  isValidEmail(email: string): boolean {
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validEmailRegex.test(email);
  }

  filterEmail(email: string): boolean {
    email = email.toLowerCase();
    const blockedEmailRegex = new RegExp("(.*@isg.*|.*@infinity.*|.*@infinitysales.*|.*@infinitylalesgroup.*|.*noemail@.*|.*na@.*|.*none@.*|.*@noemail.*)", "i");
    return this.isValidEmail(email) && !blockedEmailRegex.test(email);
  }

  protected readonly isDevMode = isDevMode;
}
