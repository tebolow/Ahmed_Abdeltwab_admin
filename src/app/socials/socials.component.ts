import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  socials: any[] = [];
  isAdminPage = false;

  ngOnInit(): void {
    this.isAdminPage = this.router.url.includes('/socials');
    this.loadSocials();
  }

  loadSocials(): void {
    this.http.get<any>(`${environment.apiUrl}/socials/getSocials`).subscribe({
      next: (res) => {
        this.socials = res?.data || [];
      },
      error: (err) => console.error(err)
    });
  }

  isSvg(icon: string): boolean {
    return typeof icon === 'string' && icon.trim().startsWith('<svg');
  }

  isUrl(icon: string): boolean {
    return typeof icon === 'string' && /^https?:\/\//i.test(icon.trim());
  }

  trustSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  goToAddSocial(): void {
    this.router.navigate(['/addSocial']);
  }

  deleteSocial(social: any): void {
    if (!confirm(`Delete "${social.name || 'this social link'}"?`)) {
      return;
    }
    this.http.delete(`${environment.apiUrl}/socials/deleteSocial/${social._id}`).subscribe({
      next: () => {
        this.socials = this.socials.filter((s) => s._id !== social._id);
      },
      error: (err) => console.error(err)
    });
  }
}
