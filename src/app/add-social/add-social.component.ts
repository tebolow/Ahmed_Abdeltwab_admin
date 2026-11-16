import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-social',
  standalone: true,
  imports: [],
  templateUrl: './add-social.component.html',
  styleUrl: './add-social.component.css'
})
export class AddSocialComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  isSubmitting = false;
  errorMessage = '';

  addSocial(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.isSubmitting = true;
    this.errorMessage = '';

    this.http.post(`${environment.apiUrl}/socials/addSocial`, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/socials']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.error || 'Failed to add social link.';
      }
    });
  }
}
