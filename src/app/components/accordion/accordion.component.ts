import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

  @ViewChild('more_info') moreInfo!: ElementRef;

  @Input() keepOpen: boolean = false;
  @Input() startCompressed: boolean = true;
  @HostBinding('class.compressed') compressed: boolean = false;

  @HostBinding('class.initialized') @Input() initialized: boolean = false;

  ngAfterViewInit() {
    if(!this.moreInfo) return;
    // Assigning first height
    this.assignHeight(this.getChildHeight());
    if(this.startCompressed) setTimeout(() => this.compress(), 50);
    setTimeout(() => this.initialized = true, 100);
  }

  toggleCompress() {
    if(this.compressed) this.decompress();
    else this.compress();
  }

  compress() {
    if(!this.moreInfo) return;
    this.assignHeight(0);
    this.compressed = true;
  }

  decompress() {
    if(!this.moreInfo) return;
    this.assignHeight(this.getChildHeight());
    this.compressed = false;
  }

  assignHeight(height: number) {
    this.moreInfo.nativeElement.style.height = `${height}px`;
  }

  getChildHeight(): number {
    const child = this.moreInfo.nativeElement.querySelector('app-accordion-content');
    if(!child) return 0;
    return child.getBoundingClientRect().height;
  }
}
