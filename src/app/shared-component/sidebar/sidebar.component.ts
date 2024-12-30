import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserServicesService } from '../../Services/user-services.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() sideNavStatus : boolean = false;
  constructor(private userService: UserServicesService) { }

  logout() {
    this.userService.logout();
  }
  
}
