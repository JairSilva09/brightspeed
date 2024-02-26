import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent {

  @Input() display: string = "none";
  @Input() addresses: any[] = [];

  @Output() emitAddress: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  addressHasSelected: boolean = false;
  public hoveredRow: any;
  public selectedAddress: any;

  selectAddress(row: any) {
    this.selectedAddress = row;
    this.addressHasSelected = true;
  }

  closeModal() {
    this.onClose.emit();
  }

  sendAddress(){
    this.emitAddress.emit(this.selectedAddress);
  }

  displayedColumns: string[] = ['address'];
}
