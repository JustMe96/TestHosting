import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'floating-panel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './floating-panel.component.html',
  styleUrl: './floating-panel.component.scss'
})
export class FloatingPanelComponent {
  @Input() trigger!: HTMLElement;
  @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();
  @HostBinding('class.active') isOpen: boolean = false;

  ngOnInit() {
    if(this.trigger) this.trigger.addEventListener('click', (event: any) => {
      if(!this.isOpen) {
        this.isOpen = true;
        this.onOpen.emit();
      }
    })
  }

  hostInteraction(event: any) {
    event.stopPropagation();
    setTimeout(() => this.isOpen = false, 100);
  }
}
