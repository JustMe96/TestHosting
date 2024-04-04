import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { TextInputComponent } from '../../components/inputs/text-input/text-input.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { ServerService } from '../../services/server.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    LogoComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {'class': 'page'}
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  validateEmail = (value: string) => {
    return UtilsService.EMAIL_REGEX.test(value);
  }

  validatePassword = (value: string) => {
    return this.password === '' || this.password.length < 6;
  }

  constructor(private utils: UtilsService, private server: ServerService) {}

  async login() {
    if(!this.validateEmail(this.email)) {
      this.utils.Toast('Email non valida!');
      return;
    }
    if(this.validatePassword(this.password)) {
      this.utils.Toast('La password deve contenere almeno 6 caratteri.')
    }

    this.server.AUTHENTICATE(this.email, this.password);
  }
}
