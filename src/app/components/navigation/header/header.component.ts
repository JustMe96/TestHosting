import { CommonModule, NgIf } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { ButtonComponent } from '../../buttons/button/button.component';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    LogoComponent,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() hideLogo: boolean = false;
  @Input() showHomeButton: boolean = false;
  @Input() title!: string;
  @Input() backRoute!: string;
  @HostBinding('class.transparent') @Input() transparent: boolean = false;
  @HostBinding('class.scroll') isScrolled: boolean = false;

  constructor(private navigation: NavigationService) {}

  ngOnInit() {
    document.body.addEventListener('scroll', (event: any) => this.onscroll(event));
  }

  onscroll(event: any) {
    const scrollValue = event.target.scrollTop;
    this.isScrolled = this.transparent && scrollValue > 20;
  }

  onBackClick() {
    if(!this.navigation.goBack() && this.backRoute) {
      this.navigation.navigate(this.backRoute);
    }
  }
}
