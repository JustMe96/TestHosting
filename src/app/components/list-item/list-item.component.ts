import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {

  @Input() icon!: string;
  @Input() enableArrow: boolean = false;
  @HostBinding('class.click-enabled') @Input() enableClick: boolean = false;

}
