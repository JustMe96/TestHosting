import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chain, ChainOriginInfo } from '../../classes/chain';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { ChainItemPreviewComponent } from '../../components/chain-item-preview/chain-item-preview.component';
import { FloatingPanelComponent } from '../../components/floating-panel/floating-panel.component';
import { DropdownComponent } from '../../components/inputs/dropdown/dropdown.component';
import { SearchbarComponent } from '../../components/inputs/searchbar/searchbar.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { ChainService } from '../../services/chain.service';
import { NavigationService } from '../../services/navigation.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-chains-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    HeaderComponent,
    RouterLink,
    DropdownComponent,
    FloatingPanelComponent,
    SearchbarComponent,
    ChainItemPreviewComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './chains-page.component.html',
  styleUrl: './chains-page.component.scss',
  host: {'class': 'page hide-overflow'}
})
export class ChainsPageComponent {
  filters: any = {
    search: '',
    chainOption: ''
  }

  chainOptions: BasicInfo[] = [];

  chains!: Chain[];
  selectedChains: Chain[] = [];
  chainOriginInfos!: ChainOriginInfo[];

  constructor(private utils: UtilsService, protected chainService: ChainService, protected navigation: NavigationService) {
    this.utils.loading = true;
    this.initialize();
  }

  async initialize() {
    const callStack: Promise<any>[] = [
      this.chainService.getChains().then((res: any) => this.chains = res),
      this.chainService.getChainOriginInfos().then((res: any) => this.chainOriginInfos = res),
    ];

    try {
      await Promise.all(callStack);
      this.selectedChains = [...this.chains];
      this.chainOptions = [{ id: '', name: 'Nessuno' },];
      this.chainOriginInfos.forEach(e => this.chainOptions.push({id: `${e.id}`, name: e.chain_info_code}));
      this.utils.loading = false;
    } catch (error) {
      this.utils.Toast('Qualcosa è andato storto');
      this.utils.loading = false;
    }
  }

  async deleteChain(code: string) {
    try {
      this.utils.loading = true;
      await this.chainService.deleteChain(code);
      await this.initialize();
      this.utils.loading = false;
      this.utils.Toast('Filiera Eliminata.');
    } catch (error: any) {
      this.utils.loading = false;
      this.utils.Toast(error.message);
    }
  }

  async clearFilters() {
    this.filters.search = '';
    this.filters.chainOption = '';
    this.search();
  }

  search() {
    const searchValue = this.filters.search.toLowerCase();
    const chainOpt = parseInt(this.filters.chainOption);
    this.selectedChains = this.chains.filter(e =>
      (this.filters.search === '' || e.name.toLowerCase().includes(searchValue))
      && (this.filters.chainOption === '' || e.chain_info.id === chainOpt)
    );
  }
}
