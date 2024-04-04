import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    SpinnerComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() icon!: string;
  @Input() text!: string;
  @Input() disabled!: boolean;
  @HostBinding('class.loading') @Input() loading: boolean = false;

  hostElem: HTMLElement;


  constructor(private _hostElem: ElementRef) {
    this.hostElem = this._hostElem.nativeElement;
  }

  @HostListener('click', ['$event'])
  stopPropagation(event: any) {
    event.stopPropagation();
  }
}
