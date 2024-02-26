import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-disclosures',
  templateUrl: './disclosures.component.html',
  styleUrls: ['./disclosures.component.scss']
})

export class DisclosuresComponent {
  @Input() IfOfficeHours:boolean = false
  @Input() IfFidiumShieldPremium:boolean  = false
  @Input() IfFidiumSteam:boolean  = false
  @Input() IfFidiumVoice:boolean  = false
  @Input() showingCart: any

  getCharacteristicValue(product: any, name: string): string {
    const characteristics = product?.marketing_copy.ui_behaviors.characteristics;
    const characteristic = characteristics?.find((char: any) => char.name === name);
    return characteristic ? characteristic.value : '';
  }

  getDuration(product: any, name: string): string {
    const characteristics = product?.prices[0].characteristics;
    const characteristic = characteristics?.find((char: any) => char.name === name);
    return characteristic ? characteristic.value : '';
  }

  findObjectWithValidDuration(dataArray: any[]): any | null {
    const isValidDuration = (character:any) => character.name === 'Duration' && !isNaN(Number(character.value));
  
    const foundObject = dataArray?.find((data) => {
      const pricesCharacteristics = data.prices[0].characteristics;
      return pricesCharacteristics.some(isValidDuration);
    });
  
    return foundObject || null;
  }
}
