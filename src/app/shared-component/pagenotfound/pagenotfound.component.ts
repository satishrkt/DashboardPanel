import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent implements OnInit {

  constructor(private title: Title) {}

  ngOnInit(): void {
      this.title.setTitle('404 Page Not Found');
  }
}
