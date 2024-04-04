import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements OnChanges {
  @Input() icon!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<any>();

  @HostBinding('class.filled') isFilled: boolean = false;
  @ViewChild('input') inputElement!: ElementRef;

  @HostBinding('class.focused') isFocused: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['value']) {
      this.isFilled = (this.value && this.value !== '') ? true : false;
    }
  }

  ngOnInit() {
    if(this.value) this.isFilled = true;
    this.valueChange.subscribe((v) => this.isFilled = v ? true : false)
  }

  focus() {
    if(this.inputElement) this.inputElement.nativeElement.focus();
  }
}
