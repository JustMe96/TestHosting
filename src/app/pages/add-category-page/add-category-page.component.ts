import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../classes/category';
import { ChainOriginInfo } from '../../classes/chain';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { DropdownComponent } from '../../components/inputs/dropdown/dropdown.component';
import { TextInputComponent } from '../../components/inputs/text-input/text-input.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { ChainService } from '../../services/chain.service';
import { NavigationService } from '../../services/navigation.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-add-category-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    TextInputComponent,
    DropdownComponent
  ],
  templateUrl: './add-category-page.component.html',
  styleUrl: './add-category-page.component.scss',
  host: {'class': 'page'}
})
export class AddCategoryPageComponent {
  category: Category = {
    id: 0,
    code: '',
    name: '',
    products: []
  }

  chains: BasicInfo[] = [];
  selectedChainId: string = '';

  loading: boolean = false;
  changes: boolean = false;
  chain_info: ChainOriginInfo = {
    chain_info_code: '',
    id: 0
  };

  constructor(private utils: UtilsService,
    private chainService: ChainService,
    private route: ActivatedRoute,
    private navigation: NavigationService) { }

  async ngOnInit() {
    const code = this.route.snapshot.paramMap.get('id');
    await this.initialize();
    if (code) this.loadCategory(code);
  }

  async initialize() {
    const res: any[] = await this.chainService.getChains();
    this.chains = [{ id: '', name: 'Nessuno' },];
    res.forEach(e => this.chains.push({ id: `${e.id}`, name: e.name }));
  }

  async loadCategory(code: string) {
    try {
      this.utils.loading = true;
      this.category = await this.chainService.getCategoryInfo(code);
      const chainInfo = await this.chainService.getCategoryChain(this.category);
      this.selectedChainId = chainInfo ? `${chainInfo.id}` : '';
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.Toast('Errore: impossibile prendere i dati Filiera.');
      this.utils.loading = false;
      if (!this.navigation.goBack()) this.navigation.navigate('/admin')
      console.log(error.message);
    }
  }

  async save() {
    try {
      if (!this.category.name) {
        this.utils.Toast('Seleziona un nome per questa categoria.');
        return;
      }
      if (this.selectedChainId === '') {
        this.utils.Toast('Seleziona una filiera di appartenenza.');
        return;
      }
      const chainId = parseInt(this.selectedChainId);
      this.loading = true;
      if (this.category.code !== '') {
        this.category = await this.chainService.editCategory(this.category, chainId);
        this.utils.Toast('La Categoria è stata modificata.');
      }
      else {
        this.category = await this.chainService.addCategory(this.category, chainId);
        this.utils.Toast('La Categoria è stata aggiunta.');
      }
      this.loading = false;
      this.changes = false;
    } catch (error: any) {
      this.utils.Toast(error.message);
      this.loading = false;
    }
  }
}
