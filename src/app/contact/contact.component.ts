import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);

  contacts: any[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/contacts/getContacts`).subscribe({
      next: (res) => {
        this.contacts = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load contact messages.';
        this.isLoading = false;
      }
    });
  }

  deleteContact(contact: any): void {
    if (!confirm(`Delete message from "${contact.name}"?`)) {
      return;
    }
    this.http.delete(`${environment.apiUrl}/contacts/deleteContact/${contact._id}`).subscribe({
      next: () => {
        this.contacts = this.contacts.filter((c) => c._id !== contact._id);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.error?.error || 'Failed to delete message.';
      }
    });
  }
}
