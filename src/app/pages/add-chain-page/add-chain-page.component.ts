import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chain } from '../../classes/chain';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { DropdownComponent } from '../../components/inputs/dropdown/dropdown.component';
import { TextInputComponent } from '../../components/inputs/text-input/text-input.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { ChainService } from '../../services/chain.service';
import { NavigationService } from '../../services/navigation.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-add-chain-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    TextInputComponent,
    DropdownComponent
  ],
  templateUrl: './add-chain-page.component.html',
  styleUrl: './add-chain-page.component.scss',
  host: {'class': 'page'}
})
export class AddChainPageComponent {

  chain: Chain = {
    id: 0,
    code: '',
    name: '',
    chain_info: {
      chain_info_code: '',
      id: 0,
    },
    categories: []
  }

  loading: boolean = false;
  changes: boolean = false;
  chainOptions: BasicInfo[] = [];
  selectedChainInfo: string = '';

  constructor(private utils: UtilsService,
    private chainService: ChainService,
    private route: ActivatedRoute,
    private navigation: NavigationService) {}

  async ngOnInit() {
    const code = this.route.snapshot.paramMap.get('id');
    await this.initialize();
    if(code) this.loadChain(code);
  }

  async initialize() {
    const res: any[] = await this.chainService.getChainOriginInfos();
    this.chainOptions = [{ id: '', name: 'Nessuno' },];
    res.forEach(e => this.chainOptions.push({id: `${e.id}`, name: e.chain_info_code}));
  }

  async loadChain(code: string) {
    try {
      this.utils.loading = true;
      this.chain = await this.chainService.getChainInfo(code);
      this.selectedChainInfo = `${this.chain.chain_info.id}`;
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.Toast('Errore: impossibile prendere i dati Filiera.');
      this.utils.loading = false;
      if(!this.navigation.goBack())this.navigation.navigate('/admin')
      console.log(error.message);
    }
  }

  async save() {
    try {
      if(!this.chain.name) {
        this.utils.Toast('Seleziona un nome per la Filiera.');
        return;
      }
      if(this.selectedChainInfo === '') {
        this.utils.Toast('Seleziona una filiera di appartenenza.');
        return;
      }
      this.chain.chain_info.id = parseInt(this.selectedChainInfo);
      this.loading = true;
      if(this.chain.code !== '') {
        this.chain = await this.chainService.editChain(this.chain);
        this.utils.Toast('La Filiera è stata modificata.');
      }
      else {
        this.chain = await this.chainService.addChain(this.chain);
        this.utils.Toast('La Filiera è stata aggiunta.');
      }
      this.loading = false;
      this.changes = false;
    } catch (error: any) {
      this.utils.Toast(error.message);
      this.loading = false;
    }
  }
}
