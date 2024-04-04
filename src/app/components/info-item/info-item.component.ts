import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-info-item',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    ButtonComponent
  ],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.scss'
})
export class InfoItemComponent {
  @Input() key: string = '';
  @Input() value!: string;
  @Input() values!: string[];
  @Input() actions!: BasicInfo[];
  @Output() actionClick: EventEmitter<string> = new EventEmitter<string>();
}
