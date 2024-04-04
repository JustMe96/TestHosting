import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../classes/category';
import { ChainOriginInfo } from '../../classes/chain';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { CategoryItemPreviewComponent } from '../../components/category-item-preview/category-item-preview.component';
import { FloatingPanelComponent } from '../../components/floating-panel/floating-panel.component';
import { InlineRadioButtonsComponent } from '../../components/inputs/inline-radio-buttons/inline-radio-buttons.component';
import { SearchbarComponent } from '../../components/inputs/searchbar/searchbar.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { ChainService } from '../../services/chain.service';
import { NavigationService } from '../../services/navigation.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    HeaderComponent,
    RouterLink,
    InlineRadioButtonsComponent,
    FloatingPanelComponent,
    SearchbarComponent,
    CategoryItemPreviewComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  host: { 'class': 'page hide-overflow' }
})
export class ProductsPageComponent {
  filters: any = {
    search: '',
    active: ''
  }

  activeOptions: BasicInfo[] = [
    {id: '', name: 'Entrambi'},
    {id: 'active', name: 'Attivo'},
    {id: 'disabled', name: 'Disattivo'},
  ];

  products!: Product[];
  selectedProducts: Product[] = [];
  chainOriginInfos!: ChainOriginInfo[];

  constructor(private utils: UtilsService, protected chainService: ChainService, protected navigation: NavigationService) {
    this.utils.loading = true;
    this.initialize();
  }

  async initialize() {
    try {
      await Promise.all([
        this.chainService.getProducts().then((res: any) => this.products = res),
        this.chainService.getChains(),
        this.chainService.getChainOriginInfos().then((res: any) => this.chainOriginInfos = res),
      ]);
      this.selectedProducts = [...this.products];
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.Toast('Qualcosa è andato storto');
      console.log(error.message)
      this.utils.loading = false;
    }
  }

  async deleteProduct(code: string) {
    try {
      this.utils.loading = true;
      await this.chainService.deleteChain(code);
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.loading = false;
      this.utils.Toast(error.message);
    }
  }

  async clearFilters() {
    this.filters.search = '';
    this.filters.categoryOption = '';
    this.search();
  }

  search() {
    const searchValue = this.filters.search.toLowerCase();
    const chainOpt = parseInt(this.filters.categoryOption);
    // this.selectedProducts = this.products.filter(e =>
    //   (this.filters.search === '' || e.name.toLowerCase().includes(searchValue))
    //   && (this.filters.categoryOption === '' || e.code === chainOpt)
    // );
  }

  updateFiltersUI(...filters: InlineRadioButtonsComponent[]) {
    filters.forEach((f: InlineRadioButtonsComponent) => f.refreshUI());
  }
}
