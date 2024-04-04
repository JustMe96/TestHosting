import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../classes/category';
import { BasicInfo } from '../../classes/utils';
import { ChainService } from '../../services/chain.service';
import { NavigationService } from '../../services/navigation.service';
import { AccordionContentComponent } from '../accordion-content/accordion-content.component';
import { AccordionHeaderComponent } from '../accordion-header/accordion-header.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { ButtonComponent } from '../buttons/button/button.component';
import { InfoItemComponent } from '../info-item/info-item.component';

@Component({
  selector: 'app-category-item-preview',
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
  templateUrl: './category-item-preview.component.html',
  styleUrl: './category-item-preview.component.scss'
})
export class CategoryItemPreviewComponent {
  @Input() category!: Category;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  products: BasicInfo[] = [];
  chain: string = '';

  constructor(protected navigation: NavigationService, private chainService: ChainService) {}

  async ngOnInit() {
    this.products = this.category.products.map(e => {
      return {id: e.code, name: e.name}
    })
    const res = await this.chainService.getCategoryChain(this.category);
    if(res) this.chain = res.name;
  }
}
