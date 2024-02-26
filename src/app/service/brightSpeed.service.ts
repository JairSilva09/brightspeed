import {Injectable, isDevMode} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ORDERDATA,orderData } from '../models/data.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Transaction_id': '',
    'Authorization': ''
  }),
};
@Injectable({
  providedIn: 'root'
})
export class BrightSpeedService {

  private transactionIsgUrl = 'api/transaction';
  private geoAddressUrl = 'api/fidium/v1/addresses';
  private timeSlots = 'api/fidium/v1/getTimeSlots';
  private checkEligibility = 'api/fidium/v1/checkEligibility';
  private carriersList = 'api/fidium/v1/carriersList';
  private order = 'api/fidium/v1/submitOrder';
  private managerCodeVerification = 'api/sales/is_valid_manager_code';
  private marketingEmailDripUrl = 'api/sales/marketing_email_drip';
  private marketingInfoUrl = 'api/marketing_info';
  private token = 'api/token';
  private dotColorUrl = 'api/dot-color/v1/availability';
  private applyGiftCardUrl = 'api/isg/gc';

  objectData: any = {}

  CartForm$ = new BehaviorSubject<ORDERDATA>(orderData);
  currentCartForm$ = this.CartForm$.asObservable();

  constructor(private http: HttpClient) { }

  applyGiftCard(giftCard: any, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        'Authorization': `Bearer ${token}`,
      })};

    return this.http.post(environment.webBaseUrl_ISG_Backend + this.applyGiftCardUrl, giftCard, httpOptions);
  }

  setLocalStorage() {
    this.CartForm$.subscribe(data => {
      localStorage.setItem('CartForm', JSON.stringify(data));
    });
  }

  marketingInfoSaleCode(marketingInfoPayload: any) {
    return this.http.post(environment.webBaseUrl_AWS + this.marketingInfoUrl, marketingInfoPayload, httpOptions);
  }

  marketingEmailDrip(payload: any, token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        'Authorization': `Bearer ${token}`,
      })};

    return this.http.post(environment.webBaseUrl_ISG_Backend + this.marketingEmailDripUrl, payload, httpOptions);
  }

  tokenCall() {
    let userAndPwd = {
      "email": environment.email,
      "password": environment.password
    }
    return this.http.post(environment.webBaseUrl_ISG_Backend + this.token, userAndPwd, httpOptions);
  }

  verifyManagerCode(managerCode: any, token:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        'Authorization': `Bearer ${token}`,
      })};
    return this.http.post(environment.webBaseUrl_ISG_Backend + this.managerCodeVerification + `/${managerCode}`, {}, httpOptions);
  }

  dotColor(transaction: any) {
    return this.http.post(environment.webBaseUrl_DOT_COLOR + this.dotColorUrl, transaction, httpOptions);
  }

  getLocalStorage() {
    if (localStorage.getItem('CartForm')) {
      this.CartForm$.next(JSON.parse((localStorage.getItem('CartForm') || '{}')));
    }
  }

  createAWSTransaction(transaction: any) {
    return this.http.post(environment.webBaseUrl + this.transactionIsgUrl, transaction, httpOptions);
  }

  setTransactionIdHeaders(transactionId: any) {
    httpOptions.headers = httpOptions.headers.set('Transaction_id', transactionId);
  }

  setCartForm(cartForm: ORDERDATA): void {
    this.CartForm$.next(cartForm);
    this.setLocalStorage()
  }

  geoAddress(addresses: any) {
     return this.http.post(environment.webBaseUrl + this.geoAddressUrl, addresses, httpOptions);
  }

  getTimeSlots(dataSlot: any){
    return this.http.post(environment.webBaseUrl + this.timeSlots, dataSlot, httpOptions);
  }

  getCheckEligibility(Check : any){
    return this.http.post(environment.webBaseUrl + this.checkEligibility, Check, httpOptions);
  }

  getCarriersList(carrier: any){

    return this.http.post(environment.webBaseUrl + this.carriersList, carrier, httpOptions);
  }

  submitOrder(orderData: any ){
    return this.http.post(environment.webBaseUrl + this.order, orderData, httpOptions);
  }
}
