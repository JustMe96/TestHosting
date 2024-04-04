import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @HostBinding('class.enabled') @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() toggle: boolean = false;
  @Input() label!: string;

  @HostListener('click', ['$event'])
  onClick(event: any) {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
    event.stopPropagation();
  }
}
