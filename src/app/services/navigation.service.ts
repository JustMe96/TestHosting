import { EventEmitter, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  currentRoute: string = '';
  fullRoute: string = '';
  onRouteChange: EventEmitter<RouteChangeEvent> = new EventEmitter<RouteChangeEvent>();
  beforeRouteChange: EventEmitter<any> = new EventEmitter<any>();

  pagesStack: string[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.fullRoute = event.url;
        const routePath = this.fullRoute.split('/');
        this.currentRoute = routePath[routePath.length - 1];
        this.pagesStack.push(this.fullRoute);
        this.onRouteChange.emit({
          route: this.currentRoute,
          fullRoute: this.fullRoute
        });
      });
  }

  goBack() {
    this.pagesStack.pop();
    if(this.pagesStack.length === 0) return false;
    const r = this.pagesStack.pop();
    if (r && r !== this.currentRoute) {
      this.navigate(r);
      return true;
    }
    return false;
  }

  navigate(url: string, params: any = null) {
    if (url === this.fullRoute) return;
    this.beforeRouteChange.emit();
    if(params) this.router.navigate([url, params])
    else this.router.navigate([url])
  }
}

export interface RouteChangeEvent {
  route: string;
  fullRoute: string;
}
