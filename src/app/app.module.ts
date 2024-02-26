import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './address/address.component';
import { BillingComponent } from './billing/billing.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { DisclosuresComponent } from './disclosures/disclosures.component';
import { DotColorComponent } from './dotcolor/dotcolor.component';
import { InstallationComponent } from './installation/installation.component';
import { LoaderComponent } from './loader/loader.component';
import { MarketingEmailDripComponent } from './marketing-email-drip/marketing-email-drip.component';
import { MenuComponent } from './menu/menu.component';
import { MessageComponent } from './message/message.component';
import { ModalAddressComponent } from './modal-address/modal-address.component';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';
import { ProductsComponent } from './products/products.component';
import { ProductsCardComponent } from './products-card/products-card.component';
import { RecapComponent } from './recap/recap.component';
import { SideCartComponent } from './side-cart/side-cart.component';
import { DatePipe } from '@angular/common';
import { TimePipe } from './service/time.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateFormattedPipe } from './date-formatted.pipe';
import { Convert12HourFormatPipe } from './convert12-hour-format.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    BillingComponent,
    ConfirmationComponent,
    DateRangeComponent,
    DisclosuresComponent,
    DotColorComponent,
    InstallationComponent,
    LoaderComponent,
    MarketingEmailDripComponent,
    MenuComponent,
    MessageComponent,
    ModalAddressComponent,
    MonthlyCalendarComponent,
    ProductsComponent,
    ProductsCardComponent, 
    RecapComponent,
    SideCartComponent,
    DateFormattedPipe,
    Convert12HourFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [DatePipe, TimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
