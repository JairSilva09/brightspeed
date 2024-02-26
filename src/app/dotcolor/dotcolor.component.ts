import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dotcolor',
  templateUrl: './dotcolor.component.html',
  styleUrls: ['./dotcolor.component.scss']
})

export class DotColorComponent {
  @Input() dotColorObject: any

}
