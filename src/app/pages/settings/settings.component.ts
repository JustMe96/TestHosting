import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { AvatarComponent } from '../../components/user/avatar/avatar.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent,
    ListItemComponent,
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  host: {'class': 'page'}
})
export class SettingsComponent {

}
