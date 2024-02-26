import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message!: string;
  @Input() description!: string;
  @Input() display: boolean = false;
  @Output() accept: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  onAccept() {
    this.display = false;
  }

  onCancel() {
    this.display = false;
  }
}
