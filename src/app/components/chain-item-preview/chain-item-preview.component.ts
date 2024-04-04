import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chain } from '../../classes/chain';
import { BasicInfo } from '../../classes/utils';
import { NavigationService } from '../../services/navigation.service';
import { AccordionContentComponent } from '../accordion-content/accordion-content.component';
import { AccordionHeaderComponent } from '../accordion-header/accordion-header.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { ButtonComponent } from '../buttons/button/button.component';
import { InfoItemComponent } from '../info-item/info-item.component';

@Component({
  selector: 'app-chain-item-preview',
  standalone: true,
  imports: [
    CommonModule,
    InfoItemComponent,
    ButtonComponent,
    AccordionComponent,
    AccordionContentComponent,
    AccordionHeaderComponent,
    RouterLink
  ],
  templateUrl: './chain-item-preview.component.html',
  styleUrl: './chain-item-preview.component.scss'
})
export class ChainItemPreviewComponent implements OnInit {
  @Input() chain!: Chain;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  categories: BasicInfo[] = [];

  constructor(protected navigation: NavigationService) {}

  ngOnInit() {
    this.categories = this.chain.categories.map(e => {
      return {id: e.code, name: e.name};
    })
  }
}
