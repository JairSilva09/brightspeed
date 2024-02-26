import { Component, ElementRef, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BrightSpeedService } from '../service/brightSpeed.service';
import { ORDERDATA } from '../models/data.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @ViewChild('logosContainer') logosContainer!: ElementRef;
  @ViewChild('menuContainer') menuContainer!: ElementRef;

  selectedMenuItem: string = '';
  earthlinkCoreData!: ORDERDATA;
  showTagClosingOffers: boolean = false;
  isMenuFixed = false;

  constructor(private router: Router, private brightSpeedService: BrightSpeedService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedMenuItem = event.url;
      }
    });

    this.brightSpeedService.currentCartForm$.subscribe((data) => {
      this.earthlinkCoreData = data;
      this.showTagClosingOffers = this.earthlinkCoreData.isgGiftCardResponse ? true : false;
    });
  }

  selectMenuItem(item: string): void {
    this.selectedMenuItem = item;
  }

  @HostListener('window:scroll', ['$event'])
  checkMenuPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const logosHeight = this.logosContainer.nativeElement.offsetHeight;
    const menuContainerTop = this.menuContainer.nativeElement.offsetTop;

    if (scrollTop > (menuContainerTop + logosHeight)) {
      this.isMenuFixed = true;
    } else {
      this.isMenuFixed = false;
    }

    this.cdRef.detectChanges();
  }
}
