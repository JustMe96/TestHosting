import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  @Input() trigger!: EventEmitter<ToastEvent>;
  @HostBinding('class.close') close: boolean = true;
  type: ToastType = ToastType.DEFAULT;
  toastTimeout: any;
  message: string = '';
  icon: boolean = false;

  ngOnInit() {
    if(this.trigger) this.trigger.subscribe((ev: ToastEvent) => this.Toast(ev));
  }

  Toast(ev: ToastEvent) {
    if(this.toastTimeout) clearTimeout(this.toastTimeout);
    this.message = ev.message;
    this.type = ev.type;
    this.icon = ev.icon ? ev.icon : false;
    this.toastTimeout = setTimeout(() => this.close = true, ev.time);
    this.close = false;
  }
}

export interface ToastEvent {
  message: string;
  time: number;
  type: ToastType;
  icon?: boolean;
}

export enum ToastType {
  DEFAULT = 'info',
  SUCCESS = 'check',
  WARNING = 'warning',
  ERROR = 'error'
}
