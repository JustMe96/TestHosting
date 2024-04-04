import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryPermissions } from '../../classes/permission';
import { User } from '../../classes/user';
import { BasicInfo } from '../../classes/utils';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { CheckboxComponent } from '../../components/inputs/checkbox/checkbox.component';
import { DropdownComponent } from '../../components/inputs/dropdown/dropdown.component';
import { TextInputComponent } from '../../components/inputs/text-input/text-input.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/user.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-add-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    TextInputComponent,
    CheckboxComponent,
    NgFor,
    NgIf,
    DropdownComponent
  ],
  templateUrl: './add-admin-page.component.html',
  styleUrl: './add-admin-page.component.scss',
  host: { 'class': 'page' }
})
export class AddAdminPageComponent {

  changes: boolean = false;
  user: User = {
    id: '',
    code: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_code: 'USER',
    updated_at: '',
    user_status: "ACTIVE",
    subscribe: []
  }

  categoryPermissions: CategoryPermissions[] = [
    { id: '', name: 'Utenti', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Aziende', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Reclamo Azienda', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Filiere', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Categorie', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Prodotti', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Abbonamenti', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'Contenuti e Traduzioni', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
    { id: '', name: 'FAQ', permissions: [{ id: '', name: 'Modifica', enabled: false }, { id: '', name: 'Aggiungi', enabled: false }] },
  ];

  roleTypes: BasicInfo[] = [
    { id: 'ADMIN', name: 'Admin' },
    { id: 'USER', name: 'User' },
  ];

  loading: boolean = false;

  constructor(private userService: UserService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private navigation: NavigationService) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('id');
    const isAdmin = this.route.snapshot.paramMap.get('isAdmin');
    if(isAdmin) this.user.role_code = 'ADMIN';
    if(code) this.loadUser(code);
  }

  async loadUser(code: string) {
    try {
      this.utils.loading = true;
      this.user = await this.userService.getUserInfo(code);
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.Toast('Errore: impossibile prendere i dati utente.');
      this.utils.loading = false;
      if(!this.navigation.goBack())this.navigation.navigate('/admin')
      console.log(error.message);
    }
  }

  async save() {
    try {
      this.loading = true;
      if(this.user.code !== '') {
        this.user = await this.userService.editUser(this.user);
        this.utils.Toast('L\'utente è stato modificato.');
      }
      else {
        this.user = await this.userService.addUser(this.user);
        this.utils.Toast('L\'utente è stato aggiunto.');
      }
      this.loading = false;
      this.changes = false;
    } catch (error: any) {
      this.utils.Toast(error.message);
      this.loading = false;
      console.log(error.message)
    }
  }
}
