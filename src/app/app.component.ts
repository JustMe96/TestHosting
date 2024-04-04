import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { NavigationService } from './services/navigation.service';
import { ServerService } from './services/server.service';
import { TranslationService } from './services/translation.service';
import { UserService } from './services/user.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    AlertDialogComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'admin-dashboard';
  @ViewChild('alert_dialog') alertDialog!: AlertDialogComponent;

  constructor(private navigation: NavigationService,
    private server: ServerService,
    private userService: UserService,
    protected utils: UtilsService,
    private translationService: TranslationService) {}

  ngAfterViewInit(): void {
    this.utils.alertDialog = this.alertDialog;
  }
}
