import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasicInfo } from '../../../classes/utils';
import { TranslationPipe } from '../../../pipes/translation.pipe';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FormsModule,
    TranslationPipe
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit, OnChanges {

  @Input() options: BasicInfo[] = [];

  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  selectedValue!: BasicInfo;

  ngOnInit() {
    if(this.value) this.selectedValue = this.options.find(e => e.id === this.value) || {id: '', name: ''};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['value']) {
      if(this.value) this.selectedValue = this.options.find(e => e.id === this.value) || {id: '', name: ''};
    }
  }

  onValueChanged(event: any) {
    this.selectedValue = this.options.find(e => e.id === event) || {id: '', name: ''};
    this.valueChange.emit(this.selectedValue.id);
  }
}
