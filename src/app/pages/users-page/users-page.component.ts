import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../classes/pagination';
import { User } from '../../classes/user';
import { AccordionContentComponent } from '../../components/accordion-content/accordion-content.component';
import { AccordionHeaderComponent } from '../../components/accordion-header/accordion-header.component';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { FloatingPanelComponent } from '../../components/floating-panel/floating-panel.component';
import { InfoItemComponent } from '../../components/info-item/info-item.component';
import { CheckboxComponent } from '../../components/inputs/checkbox/checkbox.component';
import { InlineRadioButtonsComponent } from '../../components/inputs/inline-radio-buttons/inline-radio-buttons.component';
import { SearchbarComponent } from '../../components/inputs/searchbar/searchbar.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { AvatarComponent } from '../../components/user/avatar/avatar.component';
import { UserService } from '../../services/user.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    SearchbarComponent,
    RouterLink,
    FloatingPanelComponent,
    InlineRadioButtonsComponent,
    AccordionComponent,
    AccordionHeaderComponent,
    AccordionContentComponent,
    AvatarComponent,
    CheckboxComponent,
    InfoItemComponent
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  host: {'class': 'page hide-overflow'}
})
export class UsersPageComponent {
  filters: any = {
    search: '',
    email: [{id: '', name: ''}, {id: 'validated_email', name: 'Email Validata'}, {id: 'not_validated_email', name: 'Email non Validata'}],
    agency: [{id: '', name: ''}, {id: 'with_agency', name: 'Con Agenzia'}, {id: 'without_agency', name: 'Senza Agenzia'}],
    agency_number: [{id: '', name: ''}, {id: 'agency_more_than_2', name: 'Con più di 2 Aziende'}]
  }

  users!: User[];
  selected: boolean[] = [];
  allSelected: boolean = false;
  selectedCount: number = 0;

  pagination!: Pagination;

  constructor(protected userService: UserService, protected utils: UtilsService) {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.utils.loading = true;
      this.selected = [];
      const res = await this.userService.getAdmins();
      this.pagination = res.pagination;
      const _users: User[] = res.users;
      this.selected = _users.map(e => false);
      this.users = _users;
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.loading = false;
      this.users = [];
      this.utils.Toast('Qualcosa è andato storto.');
      console.log(error.message);
    }
  }

  async deleteUsers() {
    const res = await this.utils.showAlertDialog({
      title: '',
      message: 'Sei sicuro di voler eliminare questo utente?',
      actions: [{ id: 'cancel', name: 'Annulla' }],
      mainAction: { id: 'yes', name: 'Si' },
      isDismissible: false,
    })
    if (res.id === 'yes') {
      try {
        this.utils.loading = true;
        const selectedUsers: User[] = this.getSelectedUsers();
        if(selectedUsers.length === 0) {
          this.utils.Toast('Nesssun utente selezionato.');
          return;
        }
        const userCodes: string[] = selectedUsers.map(u => u.code);
        await this.userService.deleteUsers(userCodes);
        selectedUsers.forEach(u => this.removeUserFromList(u));
        this.utils.Toast('Utenti eliminati.');
        this.deselectAll();
        this.utils.loading = false;
      } catch (error) {
        this.utils.Toast('C\'è stato un errore.');
        this.utils.loading = false;
      }
    }
  }

  removeUserFromList(user: User) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.selected.splice(index, 1);
  }

  selectAll() {
    for(let i=0; i<this.selected.length; i++) this.selected[i] = true;
    this.selectedCount = this.selected.length;
    this.allSelected = true;
  }

  deselectAll() {
    for(let i=0; i<this.selected.length; i++) this.selected[i] = false;
    this.selectedCount = 0;
    this.allSelected = false;
  }

  onItemSelect(index: number) {
    this.selected[index] = true;
    const res = this.checkIfAllSelected();
    this.selectedCount++;
  }

  onItemDeselect(index: number) {
    this.selected[index] = false;
    this.allSelected = false;
    this.selectedCount--;
  }

  checkIfAllSelected(): boolean {
    const res = this.selected.filter(e => e === false);
    if(!res || res.length === 0) {
      this.allSelected = true;
      return true;
    }
    this.allSelected = false;
    return false;
  }

  getSelectedUsers(): User[] {
    let s: User[] = [];
    this.selected.forEach((e: boolean, index: number) => {
      if(e) s.push(this.users[index]);
    });
    return s;
  }

  updateFiltersUI(...filters: InlineRadioButtonsComponent[]) {
    filters.forEach((f: InlineRadioButtonsComponent) => f.refreshUI());
  }

  clearFilters(...filters: InlineRadioButtonsComponent[]) {
    filters.forEach((f: InlineRadioButtonsComponent) => f.onTabSelected(0, true));
  }
}
