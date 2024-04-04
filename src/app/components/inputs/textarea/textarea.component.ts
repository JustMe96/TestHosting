import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<any>();

  @HostBinding('class.filled') isFilled: boolean = false;
  @ViewChild('input') inputElement!: ElementRef;

  ngOnInit() {
    if(this.value) this.isFilled = true;
    this.valueChange.subscribe((v) => this.isFilled = v ? true : false)
  }

  focus() {
    if(this.inputElement) this.inputElement.nativeElement.focus();
  }
}
