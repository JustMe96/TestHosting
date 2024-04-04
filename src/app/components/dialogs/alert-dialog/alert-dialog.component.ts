import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { BasicInfo } from '../../../classes/utils';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
  host: { 'class': 'dialog-overlay' }
})
export class AlertDialogComponent {
  protected data: AlertDialogData = {
    title: 'Test Title',
    message: 'Sei sicuro di voler eliminare questo utente?',
    actions: [{ id: 'no', name: 'No' }],
    mainAction: { id: 'yes', name: 'Si' },
    isDismissible: false
  }

  protected closeDialog: any;

  @HostBinding('class.active') isActive: boolean = false;

  async showAlertDialog(dialogData: AlertDialogData): Promise<BasicInfo> {
    return await new Promise((resolve: any) => {
      if (this.isActive) {
        resolve({ id: '', name: '' });
        return;
      }
      this.data = dialogData;
      this.isActive = true;
      this.closeDialog = (action: BasicInfo) => {
        this.isActive = false;
        resolve(action);
      }
    })
  }

  protected onActionClick(action: BasicInfo) {
    if (!this.closeDialog) return;
    this.closeDialog(action);
  }

  @HostListener('click', ['$event'])
  stopPropagation(event: any) {
    event.stopPropagation();
  }
}

export interface AlertDialogData {
  title?: string;
  message: string;
  actions?: BasicInfo[];
  mainAction: BasicInfo;
  isDismissible: boolean;
}
