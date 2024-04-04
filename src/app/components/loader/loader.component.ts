import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  host: {'class': 'dialog-overlay'}
})
export class LoaderComponent {
  @HostBinding('class.active') @Input() loading: boolean = false;
}
