import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { deleteItem } from '../../animations/angular-animations';
import { Pagination } from '../../classes/pagination';
import { User } from '../../classes/user';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { UserService } from '../../services/user.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    RouterLink,
    ListItemComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  host: { 'class': 'page' },
  animations: [
    deleteItem
  ]
})
export class AdminPageComponent {

  users!: User[];
  pagination!: Pagination;

  constructor(private userService: UserService, protected utils: UtilsService) {
    this.utils.loading = true;
  }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.utils.loading = true;
      const res = await this.userService.getAdmins();
      this.pagination = res.pagination;
      this.users = res.users;
      this.utils.loading = false;
    } catch (error: any) {
      this.utils.loading = false;
      this.users = [];
      this.utils.Toast('Qualcosa è andato storto.');
      console.log(error.message);
    }
  }

  async deleteUser(index: number) {
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
        await this.userService.deleteUsers([this.users[index].code]);
        this.users.splice(index, 1);
        this.utils.Toast('Utente eliminato.');
        this.utils.loading = false;
      } catch (error) {
        this.utils.Toast('C\'è stato un errore.');
        this.utils.loading = false;
      }
    }
  }
}
