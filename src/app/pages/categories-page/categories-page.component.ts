import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../classes/category';
import { ChainOriginInfo } from '../../classes/chain';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { CategoryItemPreviewComponent } from '../../components/category-item-preview/category-item-preview.component';
import { FloatingPanelComponent } from '../../components/floating-panel/floating-panel.component';
import { DropdownComponent } from '../../components/inputs/dropdown/dropdown.component';
import { SearchbarComponent } from '../../components/inputs/searchbar/searchbar.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { ChainService } from '../../services/chain.service';
import { NavigationService } from '../../services/navigation.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    HeaderComponent,
    RouterLink,
    DropdownComponent,
    FloatingPanelComponent,
    SearchbarComponent,
    CategoryItemPreviewComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
  host: {'class': 'page hide-overflow'}
})
export class CategoriesPageComponent {
  filters: any = {
    search: '',
    categoryOption: ''
  }

  categoryOptions: BasicInfo[] = [];

  categories!: Category[];
  selectedCategories: Category[] = [];
  chainOriginInfos!: ChainOriginInfo[];

  constructor(private utils: UtilsService, protected chainService: ChainService, protected navigation: NavigationService) {
    this.utils.loading = true;
    this.initialize();
  }

  async initialize() {
    const callStack: Promise<any>[] = [
      this.chainService.getCategories().then((res: any) => this.categories = res),
      this.chainService.getChains(),
      this.chainService.getChainOriginInfos().then((res: any) => this.chainOriginInfos = res),
    ];

    try {
      await Promise.all(callStack);
      this.selectedCategories = [...this.categories];
      this.categoryOptions = [{ id: '', name: 'Nessuno' },];
      this.chainOriginInfos.forEach(e => this.categoryOptions.push({ id: `${e.id}`, name: e.chain_info_code }));
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.Toast('Qualcosa è andato storto');
      console.log(error.message)
      this.utils.loading = false;
    }
  }

  async deleteCategory(code: string) {
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
    this.selectedCategories = this.categories.filter(e =>
      (this.filters.search === '' || e.name.toLowerCase().includes(searchValue))
      && (this.filters.categoryOption === '' || e.id === chainOpt)
    );
  }
}
