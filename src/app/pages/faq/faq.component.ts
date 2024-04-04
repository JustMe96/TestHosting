import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQ } from '../../classes/faq';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { ServerService } from '../../services/server.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  host: {'class': 'page hide-overflow'}
})
export class FaqComponent {

  faqs: FAQ[] = [];

  constructor(protected utils: UtilsService, private server: ServerService) {
    this.utils.loading = true;
  }

  ngOnInit() {
    this.getFAQs();
  }

  async getFAQs() {
    try {
      this.utils.loading = true;
      const res = await this.server.POST('admin/faq/list');
      this.faqs = res.data;
      this.utils.loading = false;
    } catch (error) {
      this.utils.Toast('Qualcosa è andato storto');
      this.utils.loading = false;
    }
  }
}
