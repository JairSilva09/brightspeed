import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { ProductsComponent } from './products/products.component';
import { BillingComponent } from './billing/billing.component';
import { InstallationComponent } from './installation/installation.component';
import { RecapComponent } from './recap/recap.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: 'address',
    component: AddressComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'installation',
    component: InstallationComponent
  }
  ,
  {
    path: 'recap',
    component: RecapComponent
  }
  ,
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: '',
    redirectTo: 'address',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
