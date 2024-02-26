import { Component, OnInit } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { ActivationEnd, Router } from '@angular/router';
import { ORDERDATA } from '../models/data.model';
import { PRODUCTS_EARTHLINK } from '../mock-data';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  address: any
  earthlinkCoreData!: ORDERDATA;
  productList: any
  selectedProduct: boolean = false;
  cards = [1, 2, 3, 4, 5,];
  loaderOn = false;
  loaderTitle: string = '';
  currentPage = 'products';

  //-------error-------------//
  ErrorMessage: string = "";
  answerWithError: boolean = false;
  //-------------------------//

  constructor(private brightSpeedService: BrightSpeedService, private router: Router) { }

  ngOnInit(): void {
    this.brightSpeedService.getLocalStorage()
    this.brightSpeedService.currentCartForm$.subscribe((data) => {

      this.earthlinkCoreData = data;
      this.productList = PRODUCTS_EARTHLINK.response.internetPlansList

      if (this.currentPage === 'products') {
        this.currentPage = '';
      }
    })
    this.brightSpeedService.setTransactionIdHeaders(this.earthlinkCoreData.transactionId);
  }

  idProductSelected(i: any){
    this.productList.forEach((element:any,index: number) => {
      element.selected = index === i?true:false;
    });
    //this.earthlinkCoreData.showingCart.product=this.productList[i]
    this.selectedProduct = true;
  }

  selectedVoiceProduct(i: any){
    this.productList.forEach((element:any,index: number) => {
      element.selected = index === i?true:false;
    });
    //this.earthlinkCoreData.showingCart.product=this.productList[i]
    this.selectedProduct = true;
  }

  filterProducts(selectedOrder: any) {

    if (selectedOrder.value === 'descending speed') {
        this.productList.sort((a:any, b:any) => {
          let matchA = a.PlanName.match(/(\d+)\s*(\w+)/);
          let matchB = b.PlanName.match(/(\d+)\s*(\w+)/);
          if (matchA && matchB) {
            let dataA = { number: parseInt(matchA[1]), unit: matchA[2].toLowerCase() };
            let dataB = { number: parseInt(matchB[1]), unit: matchB[2].toLowerCase() };

            if (dataA.unit === 'gig' && dataB.unit === 'mbps') {
              return -1;
            } else if (dataA.unit === 'mbps' && dataB.unit === 'gig') {
              return 1;
            } else {
              if (dataB.number !== dataA.number) {
                return dataB.number - dataA.number;
              }
              return 0;
            }
          }
          return 0;
        });
    } if (selectedOrder.value === 'ascending speed') {
      this.productList.sort((a:any, b:any) => {
        let matchA = a.PlanName.match(/(\d+)\s*(\w+)/);
        let matchB = b.PlanName.match(/(\d+)\s*(\w+)/);
        if (matchA && matchB) {
          let dataA = { number: parseInt(matchA[1]), unit: matchA[2].toLowerCase() };
          let dataB = { number: parseInt(matchB[1]), unit: matchB[2].toLowerCase() };

          if (dataA.unit === 'mbps' && dataB.unit === 'gig') {
            return -1;
          } else if (dataA.unit === 'gig' && dataB.unit === 'mbps') {
            return 1;
          } else {
            if (dataA.number !== dataB.number) {
              return dataA.number - dataB.number;
            }
            return 0;
          }
        }
        return 0;
      });
    }
   else if (selectedOrder.value  === 'descending price') {
      this.productList.sort((producto1:any, producto2:any) => {
        const precio1 = parseFloat(producto1.recurringAmount);
        const precio2 = parseFloat(producto2.recurringAmount);
        return precio2 - precio1;
      });
    } else if (selectedOrder.value  === 'ascending price') {
      this.productList.sort((producto1:any, producto2:any) => {
        const precio1 = parseFloat(producto1.recurringAmount);
        const precio2 = parseFloat(producto2.recurringAmount);
        return precio1 - precio2;
      });
    }
  }

  extractNumberAndUnit(input: any) {
    var match = input.match(/(\d+)\s*(\w+)/);
    if (match) {
      var number = parseInt(match[1]);
      var unit = match[2].toLowerCase();
      return { number, unit };
    }
    return null;
  }

  previous() {
    this.router.navigate(['/address'])
  }

  carrierList(){
    let carrier = {
      "agentName": this.earthlinkCoreData.agentId,
      "market": this.earthlinkCoreData.market
    }
    this.loaderOn = true;
    this.brightSpeedService.getCarriersList(carrier).subscribe({
      next: (data: any) => {
        this.earthlinkCoreData.carriersList = data.response.carriers;
        this.brightSpeedService.setCartForm(this.earthlinkCoreData);
        this.loaderOn = false;
        if(this.earthlinkCoreData.isgGiftCardResponse){
          this.router.navigate(['closing']);
        }else{
          this.router.navigate(['billing']);
        }
      },
      error: (error: any) => {
        console.error("Error in geoAddress call:", error);
        this.ErrorMessage = error.error.message;
        this.loaderOn = false;
        this.answerWithError = true;
      },
      complete: () => {

      }
    });
  }

  submit() {
    //this.carrierList();
     //HARD CODE
     this.loaderOn = true;
     this.loaderTitle = 'Getting Products'
     setTimeout(() => {      
     this.loaderOn = false;
     this.router.navigate(['billing']);
     }, 3000);
     ///// END HARD CODE /////////
  }

}
