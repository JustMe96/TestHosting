import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BasicInfo } from '../../../classes/utils';
import { TranslationPipe } from '../../../pipes/translation.pipe';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'inline-radio-buttons',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    NgFor,
    NgIf,
    TranslationPipe
  ],
  templateUrl: './inline-radio-buttons.component.html',
  styleUrl: './inline-radio-buttons.component.scss'
})
export class InlineRadioButtonsComponent {
  @Input() options: BasicInfo[] = [];
  @ViewChildren('options') option_buttons!: QueryList<ElementRef>;
  @ViewChild('highlighter') highlighter!: ElementRef;
  @Input() startIndex: number = 0;
  @Output() tabSelected: EventEmitter<BasicInfo> = new EventEmitter<BasicInfo>();

  selectedIndex: number = -1;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => this.onTabSelected(this.startIndex), 20);
    window.addEventListener('resize', () => this.onTabSelected(this.selectedIndex, false));
  }

  refreshUI() {
    setTimeout(() => this.onTabSelected(this.selectedIndex, false), 300);
  }

  onTabSelected(index: number, emitEvent: boolean = true) {
    this.selectedIndex = index;
    const elem: any = this.option_buttons.get(this.selectedIndex)?.nativeElement;
    if(!elem) return;
    this.alignHighlighter(elem);
    if(emitEvent) this.tabSelected.emit(this.options[index]);
  }

  alignHighlighter(targetTab: HTMLElement) {
    if(!this.options || this.options.length === 0) return;
    const rect = targetTab.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const left = targetTab.offsetLeft;
    this.highlighter.nativeElement.style.width = `${width}px`;
    this.highlighter.nativeElement.style.height = `${height}px`;
    this.highlighter.nativeElement.style.left = `${left}px`;
  }
}
