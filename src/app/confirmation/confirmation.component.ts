import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from "@angular/common";
import { ORDERDATA } from '../models/data.model';
import { DateFormattedPipe } from '../date-formatted.pipe';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private brightSpeedService: BrightSpeedService, private router: Router, private datePipe: DatePipe) {
  }

  confirmationData: any;
  earthlinkCoreData!: ORDERDATA
  dotColorObject: any;
  sumTotal: number = 0;
  currentPage = 'confirmation';
  loaderOn = false;
  loaderTitle: string = '';
  ErrorMessage: string = "";
  answerWithError: boolean = false;
  formattedDateTimeRange: any;
  webBaseUrl = environment.webBaseUrl_ISG_Backend;
  token = 'api/token';
  giftCardApplied = false;
  readGiftCardDisclosure = false;

  ngOnInit(): void {
    this.brightSpeedService.getLocalStorage();

    this.brightSpeedService.currentCartForm$.subscribe({
      next: (data: any) => {
        this.earthlinkCoreData = data

        this.formattedDateTimeRange = this.formatDateTimeRange(this.earthlinkCoreData.appointment.startTime, this.earthlinkCoreData.appointment.endTime);
        this.currentPage = '';
        // this.loaderOn = true
        // this.loaderTitle = 'Updating Cart Information'
        // this.brightSpeedService.showCart(this.earthlinkCoreData.product.offer_id).subscribe({
        //   next: (cartData: any) => {
        //     this.earthlinkCoreData.showCartData = cartData;
        //     this.confirmationData = cartData
        //   }, error: (error: any) => {
        //     console.error("Error adding products:", error);
        //     this.ErrorMessage = error.error.message;
        //     this.loaderOn = false;
        //     this.answerWithError = true;
        //   }, complete: () => {
        //     this.loaderOn = false;
        //     this.confirmationRquest();
        //     if (this.earthlinkCoreData.salesConsumer !== "ISG - Direct Sales") {
        //       this.dColor();
        //     }
        //   }
        // })
      }, error: (error: any) => {
        console.error("Error adding products:", error);
        this.ErrorMessage = error.error.message;
        this.loaderOn = false;
        this.answerWithError = true;
      }, complete: () => {
        //("Products added correctly.");
      }
    })
  }

  // confirmationRquest() {
  //   this.loaderOn = true
  //   this.loaderTitle = 'Getting Token'
  //   if (this.earthlinkCoreData && !this.earthlinkCoreData.broadbandResponse) {
  //     this.brightSpeedService.tokenCall().subscribe({
  //       next: (data: any) => {
  //         this.loaderOn = false
  //         const downloadSpeedsAndDescriptions = this.earthlinkCoreData.products.productsViasat.map((product: any) => {
  //           const downloadCharacteristic = product.marketing_copy.ui_behaviors.characteristics.find((char: any) => char.name === 'DOWNLOAD_SPEED');
  //           const downloadUnits = product.marketing_copy.ui_behaviors.characteristics.find((char: any) => char.name === 'DOWNLOAD_UNITS').value;
  //           const downloadSpeed = Number(downloadCharacteristic.value);
  //           return {
  //             speed: downloadSpeed,
  //             description: product.description,
  //             name: product.name,
  //             units: downloadUnits
  //           };
  //         }).filter((item: any) => !isNaN(item.speed));

  //         const maxValue = Math.max(...downloadSpeedsAndDescriptions.map((item: any) => item.speed));
  //         const minValue = Math.min(...downloadSpeedsAndDescriptions.map((item: any) => item.speed));

  //         const productWithMaxValue = downloadSpeedsAndDescriptions.find((item: any) => item.speed === maxValue);
  //         const productWithMinValue = downloadSpeedsAndDescriptions.find((item: any) => item.speed === minValue);
  //         const soldValue = this.earthlinkCoreData.product?.marketing_copy?.ui_behaviors.characteristics.find((char: any) => char.name === 'DOWNLOAD_SPEED').value.toString();
  //         const soldValueUnits = this.earthlinkCoreData.product?.marketing_copy?.ui_behaviors.characteristics.find((char: any) => char.name === 'DOWNLOAD_UNITS').value
  //         const uploadValue = this.earthlinkCoreData.product?.marketing_copy?.ui_behaviors.characteristics.find((char: any) => char.name === 'UPLOAD_SPEED').value.toString();
  //         const uploadUnits = this.earthlinkCoreData.product?.marketig_copy?.ui_behaviors.characteristics.find((char: any) => char.name === 'UPLOAD_UNITS').value;
  //         const selectedAddonsDescription = this.confirmationData?.product_types.slice(1).map((addon: any) => addon.name).join('|');
  //         const installFee = (this.earthlinkCoreData.oneTimeFees == '0') ? "No Install Fee" : "Install Fee"
  //         const selectedAddons = this.confirmationData?.product_types.slice(1).map((addon: any) => {
  //           return {
  //             addon_code: addon.name,
  //             addon_value: addon.prices[0]?.amount?.value.toString(),
  //             addon_category: '16'
  //           }
  //         });
  //         let USADate = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  //         let createDate = this.datePipe.transform(USADate, 'yyyy-MM-dd HH:mm:ss');

  //         let payload = [{
  //           "order_id": this.earthlinkCoreData.billingAccountId,
  //           "provider": "Viasat",
  //           "product_description": this.earthlinkCoreData.product.description,
  //           "first_name": this.earthlinkCoreData.firstName,
  //           "last_name": this.earthlinkCoreData.lastName,
  //           "phone": this.earthlinkCoreData.contact.primary.phoneNumber,
  //           "email": this.earthlinkCoreData.contact.primary.email,
  //           "address1": this.earthlinkCoreData.contact.primary.address.addressLine1,
  //           "address2": "",
  //           "city": this.earthlinkCoreData.contact.primary.address.city,
  //           "state": this.earthlinkCoreData.contact.primary.address.state,
  //           "zip": this.earthlinkCoreData.contact.primary.address.zipCode,
  //           "product_type": "Internet",
  //           "download": soldValue + soldValueUnits,
  //           "upload": uploadValue + uploadUnits,
  //           "agent_id": (this.earthlinkCoreData.agentId) ? this.earthlinkCoreData.agentId : '-1',
  //           "status": "Open",
  //           "custom1": selectedAddonsDescription,
  //           "custom2": this.earthlinkCoreData.orderId,
  //           "custom3": "",
  //           "custom4": this.earthlinkCoreData.salesConsumer,
  //           "custom5": "Residential",
  //           "custom6": installFee,
  //           "custom7": this.earthlinkCoreData.callkey,
  //           "custom8": "",
  //           "order_date": createDate,
  //           "ludate": createDate,
  //           "IsBusiness": "0",
  //           "api_source": "Viasat",
  //           "quote_id": this.earthlinkCoreData.transactionId,
  //           "install_date": this.earthlinkCoreData.appointment.startTime.split('T')[0],
  //           "addons": selectedAddons
  //         }]
  //         this.loaderOn = true
  //         this.loaderTitle = 'Setting Broadband Orders'
  //         this.brightSpeedService.isgBroadbandOrders(payload, data.token).subscribe({
  //           next: (broadBandData: any) => {
  //             this.loaderOn = false
  //             let payload = {
  //               "record_id": broadBandData[0].record_id,
  //               "order_id": this.earthlinkCoreData.billingAccountId,
  //               "speed_sold": soldValue + soldValueUnits,
  //               "bundle_max_speed": "0",
  //               "bundle_min_speed": "0",
  //               "standalone_max_speed": maxValue.toString() + productWithMaxValue.units,
  //               "standalone_min_speed": minValue.toString() + productWithMinValue.units,
  //               "bundle_max_speed_description": "",
  //               "bundle_min_speed_description": "",
  //               "standalone_max_speed_description": productWithMaxValue.description,
  //               "standalone_min_speed_description": productWithMinValue.description
  //             }

  //             this.loaderTitle = 'Setting Broadband Speed'
  //             this.brightSpeedService.isgBroadbandOrdersSpeed(payload, data.token).subscribe({
  //               next: (orderSpeedData: any) => {
  //                 this.loaderOn = false;
  //                 this.earthlinkCoreData.broadbandResponse = true;
  //                 this.brightSpeedService.setCartForm(this.earthlinkCoreData);
  //               },
  //               error: (error: any) => {
  //                 console.error("Error in bandOrdersSpeed call:", error);
  //                 this.ErrorMessage = error.error.message;
  //                 this.loaderOn = false;
  //                 this.answerWithError = true;
  //               },
  //               complete: () => {
  //                 //("bandOrdersSpeed call completed.");
  //               }
  //             })
  //           },
  //           error: (error: any) => {
  //             console.error("Error in BroadbandOrders call:", error);
  //             this.ErrorMessage = error.error.message;
  //             this.loaderOn = false;
  //             this.answerWithError = true;
  //           },
  //           complete: () => {
  //             //("BroadbandOrders call completed.");
  //           }
  //         })
  //       }
  //     })
  //   }
  // }

  // dColor() {
  //   this.loaderOn = true;
  //   this.loaderTitle = 'Getting data'
  //   let payload = {
  //     "call_key": (this.earthlinkCoreData.callkey) ? this.earthlinkCoreData.callkey : '-1',
  //     "agent_id": (this.earthlinkCoreData.agentId) ? this.earthlinkCoreData.agentId : '-1',
  //     "order_id": this.earthlinkCoreData.orderId,
  //     "customer": [
  //       {
  //         "first_name": this.earthlinkCoreData.firstName,
  //         "last_name": this.earthlinkCoreData.lastName,
  //         "phone_number": this.earthlinkCoreData.contact.primary.phoneNumber,
  //         "email": this.earthlinkCoreData.contact.primary.email,
  //         "address_one": this.earthlinkCoreData.contact.primary.address.addressLine1,
  //         "address_two": "",
  //         "city": this.earthlinkCoreData.contact.primary.address.city,
  //         "state": this.earthlinkCoreData.contact.primary.address.state,
  //         "zip_code": this.earthlinkCoreData.contact.primary.address.zipCode
  //       }
  //     ],
  //     "provider": "Viasat",
  //     "rule": [
  //       {
  //         "is_mdu": false,
  //         "is_dish_customer": false
  //       }
  //     ]
  //   }
  //   //('payload',payload);
  //   this.loaderOn = true;

  //   this.brightSpeedService.dotColor(payload).subscribe({
  //     next: (data: any) => {
  //       this.dotColorObject = data;
  //       this.loaderOn = false;
  //     },
  //     error: (error: any) => {
  //       console.error("Error in dotColor call:", error);
  //       this.ErrorMessage = error.error.message;
  //       this.loaderOn = false;
  //       this.answerWithError = true;
  //     },
  //     complete: () => {
  //       //("dotColor call completed.");
  //     }
  //   })
  // }

  // getCharacteristicValue(name: string): string {
  //   // const characteristics = this.earthlinkCoreData.product?.marketing_copy?.translations[0].characteristics;
  //   const characteristic = characteristics?.find((char: any) => char.name === name);
  //   this.calculateTotal()
  //   return characteristic ? characteristic.value : '';
  // }

  calculateTotal() {
    if (this.earthlinkCoreData.showingCart.productInternet) {
      this.sumTotal = parseInt(this.earthlinkCoreData.showingCart.productInternet.recurringAmount);
      // if (this.confirmationData) {
      //   for (let option of this.confirmationData) {
      //     this.sumTotal += option.prices[0]?.amount?.value;
      //   }
      // }
    }
    this.sumTotal = Number(this.sumTotal.toFixed(2))
  }

  formatDateTimeRange(startDateTimeString: string, endDateTimeString: string): string {
    const startDate = new Date(startDateTimeString);
    const endDate = new Date(endDateTimeString);

    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const startAmOrPm = startHours >= 12 ? "pm" : "am";
    const formattedStartHours = startHours % 12 === 0 ? 12 : startHours % 12;
    const formattedStartMinutes = startMinutes.toString().padStart(2, "0");

    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    const endAmOrPm = endHours >= 12 ? "pm" : "am";
    const formattedEndHours = endHours % 12 === 0 ? 12 : endHours % 12;
    const formattedEndMinutes = endMinutes.toString().padStart(2, "0");

    return `${startDate.toLocaleDateString()} ${formattedStartHours}:${formattedStartMinutes}${startAmOrPm} - ${formattedEndHours}:${formattedEndMinutes}${endAmOrPm}`;
  }

  // applyGiftCard() {

  //   if (!this.earthlinkCoreData.isgGiftCardResponse) {
  //     this.loaderOn = true;
  //     this.loaderTitle = 'Getting GC Token'
  //     this.brightSpeedService.tokenCall().subscribe({
  //       next: (data: any) => {
  //         this.loaderOn = false;
  //         let USADate = new Date(this.earthlinkCoreData.appointment.startTime).toLocaleString("en-US", {timeZone: "America/New_York"});
  //         let installDate = this.datePipe.transform(USADate, 'MM/dd/yyyy');

  //         const applyGiftCardPayload = {
  //           "firstName": this.earthlinkCoreData.firstName,
  //           "lastName": this.earthlinkCoreData.lastName,
  //           "addressLine1": this.earthlinkCoreData.contact.primary.address.addressLine1,
  //           "city": this.earthlinkCoreData.contact.primary.address.city,
  //           "state": this.earthlinkCoreData.contact.primary.address.state,
  //           "country": this.earthlinkCoreData.contact.primary.address.country_code,
  //           "zip": this.earthlinkCoreData.contact.primary.address.zipCode,
  //           "phoneNumber": this.earthlinkCoreData.contact.primary.phoneNumber,
  //           "emailAddress": this.earthlinkCoreData.contact.primary.email,
  //           "offer": "Gift" + this.earthlinkCoreData.isgGiftCard,
  //           "accountNumber": this.earthlinkCoreData.billingAccountId,
  //           "resellerName": "Viasat",
  //           "installDate": installDate, // Format m/d/Y
  //           "amount": this.earthlinkCoreData.isgGiftCard,
  //           "cardType": "Visa",
  //           "requestType": "Voucher Creation",
  //           "agentId": this.earthlinkCoreData.agentId,
  //           "accountStatus": "Status"
  //         };

  //         this.loaderOn = true;
  //         this.loaderTitle = 'Applaying Gift Card'
  //         this.brightSpeedService.applyGiftCard(applyGiftCardPayload, data.token).subscribe({
  //           next: (response: any) => {
  //             if (response) {
  //               this.giftCardApplied = true;
  //               this.earthlinkCoreData.isgGiftCardResponse = true;
  //               this.brightSpeedService.setCartForm(this.earthlinkCoreData);
  //             }
  //           },
  //           error: (error: any) => {
  //             console.error("Error applying gift card:", error);
  //             this.ErrorMessage = error.error.message;
  //             this.loaderOn = false;
  //             this.answerWithError = true;
  //           },
  //           complete: () => {
  //             this.loaderOn = false;
  //           }
  //         });
  //       }
  //     });
  //   }
  //   else
  //   {
  //     this.answerWithError = true;
  //     this.ErrorMessage = "Gift card already applied";
  //     this.giftCardApplied = true;
  //   }

  // }
}
