import { EventEmitter, Injectable } from '@angular/core';
import { BasicInfo } from '../classes/utils';
import { AlertDialogComponent, AlertDialogData } from '../components/dialogs/alert-dialog/alert-dialog.component';
import { ToastEvent, ToastType } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  toastTrigger: EventEmitter<ToastEvent> = new EventEmitter<ToastEvent>();
  alertDialog!: AlertDialogComponent;
  loading: boolean = false;

  // sidedrawer: EventEmitter<any> = new EventEmitter<any>();
  // sidemenuActive = false;

  // showSidedrawer() {
  //   this.sidedrawer.emit();
  // }

  static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async showAlertDialog(data: AlertDialogData): Promise<BasicInfo> {
    if(!this.alertDialog) return {id: '', name: ''};
    return this.alertDialog.showAlertDialog(data);
  }

  Toast(message: string, time: number = 3000, type: ToastType = ToastType.DEFAULT, icon = false) {
    this.toastTrigger.emit({ message, time, type, icon });
  }

  scrollTo(scroller: HTMLElement, element: HTMLElement) {
    if (window.getComputedStyle(scroller).overflowY === 'scroll') scroller.scroll(0, element.offsetTop);
    else scroller.scroll(element.offsetLeft, 0);
  }

  redirectExternal(url: string) {
    window.open(url);
  }

  lerp(start: number, end: number, smooth: number) {
    return start - (start - end) * smooth;
  }

  wait(time: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), time);
    });
  }

  whenVisible(element: HTMLElement, className: string = 'reveal-element', delay: number = 0, threshold: number = 1, callback?: Function, rootMargin: string = '0px') {
    const observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => element.classList.add(className), delay);
        if (callback) callback();
        observer.unobserve(element);
      }
    }, { threshold, root: null, rootMargin });

    observer.observe(element);
  }

  automaticWhenVisible(threshold: number = 1) {
    const elements = document.querySelectorAll('.element-to-reveal');
    Array.from(elements).forEach((e: any) => this.whenVisible(e, 'reveal-element', 0, threshold));
  }
}
