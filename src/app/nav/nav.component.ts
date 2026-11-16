import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ThemeService } from '../services/theme/theme.service';
import { DataService } from '../services/data/data.service';
import { environment } from '../../environments/environment';
import { MediaUrlPipe } from '../shared/pipes/media-url.pipe';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MediaUrlPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  private dataService = inject(DataService);

  staticURL = environment.staticURL;
  downloadCvUrl = `${environment.apiUrl}/data/downloadCv`;
  siteData: any = null;
  menuOpen = false;

  ngOnInit(): void {
    this.dataService.currentData$.subscribe((data) => {
      this.siteData = data;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.closeMenu();
    this.auth.logout();
  }
}
