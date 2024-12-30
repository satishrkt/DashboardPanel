import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared-component/sidebar/sidebar.component';
import { HeaderComponent } from './shared-component/header/header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserServicesService } from './Services/user-services.service';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  title = 'DashboardPanel';
  sideNavStatus : boolean = true;
  blankUrl = '';
  currentUrl !: string;
  checkoutUrl = ["/login"];

  constructor(
    public userService: UserServicesService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private location: Location
  ) {
    this.route.events
      .pipe(filter((e: any) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.currentUrl = e.url;  
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            window.scrollTo(0, 0); // Safe to use `window` here
          }, 100);
        }
      });
  }
  
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.currentUrl = this.location.prepareExternalUrl(this.location.path());
    }
  }
  
  isCheckoutRoute() {
    if(this.currentUrl == '/' || this.currentUrl == '/login') {
      return false;
    }
    else {
      return true
    }
  }
  
}
