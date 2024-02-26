import { Component, EventEmitter, Output, Input, isDevMode } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';

@Component({
  selector: 'app-marketing-email-drip',
  templateUrl: './marketing-email-drip.component.html',
  styleUrls: ['./marketing-email-drip.component.scss']
})
export class MarketingEmailDripComponent {

  @Input() earthlinkCoreData: any = {};

  emailDrip: boolean = false;
  loaderTitle: string = '';
  loaderOn = false;
  @Output() emailDripEvent: EventEmitter<boolean> = new EventEmitter();

  //-------error-------------//
  ErrorMessage: string = "";
  answerWithError: boolean = false;
  //-------------------------//

  constructor(private brightSpeedService: BrightSpeedService) { }

  getEmailDrip($event: any) {

      this.loaderTitle = 'Updating Email Drip';
      this.loaderOn = true;
      let active = $event.value === 'true' ? "1" : "0";

      if (this.earthlinkCoreData.email) {
        this.emailDripEvent.emit($event.value);
        this.brightSpeedService.tokenCall().subscribe({
          next:(data: any)=> {
            let payload =
              {
                "callkey": this.earthlinkCoreData.callkey,
                "email": this.earthlinkCoreData.email,
                "first_name": this.earthlinkCoreData.firstName ? this.earthlinkCoreData.firstName : 'N/A',
                "last_name": this.earthlinkCoreData.lastName ? this.earthlinkCoreData.lastName : 'N/A',
                "active": active,
                "provider_id": isDevMode() ? 13 : 13,
              }

            this.brightSpeedService.marketingEmailDrip(payload, data.token).subscribe({
              next: (data: any) => {
                this.loaderOn = false;
              },
              error: (error: any) => {
                console.error("Error in marketingEmailDrip call:", error);
                this.ErrorMessage = "Transaction Error";
                this.loaderOn = false;
                this.answerWithError = true;
              },
            });
          },
          error: (error: any) => {
            console.error("Error at moment get token please send notification to IT team:", error);
            this.ErrorMessage = "Token error Error";
            this.loaderOn = false;
            this.answerWithError = true;
          },
          complete: () => {
            this.loaderOn = false;
          },
        });
      }
      else
      {
        this.loaderOn = false;
      }
  }
}
