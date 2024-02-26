import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { Router } from '@angular/router';
import { ORDERDATA } from '../models/data.model';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent implements OnInit {
  @Input() product: any;
  @Output() idProductEmitter = new EventEmitter();
  selected: boolean = false;
  id: string = "";
  data!: ORDERDATA;
  productDestriptions: Array<string> = [];

  constructor(private brightSpeedService: BrightSpeedService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.product.id;
    if (this.product.hasOwnProperty('Description')) {
        this.productDestriptions = this.product.Description.split('\n');
    }
    this.brightSpeedService.currentCartForm$.subscribe((data) => {
      this.data = data;
    });
  }

  addProductCart() {
    this.selected = !this.selected;
    this.idProductEmitter.emit(this.id);
  }
}
