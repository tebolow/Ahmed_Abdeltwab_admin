import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { SocialsComponent } from '../socials/socials.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  private dataService = inject(DataService);
  data: any = null;
  copiedField: 'email' | 'phone' | null = null;

  ngOnInit(): void {
    this.dataService.currentData$.subscribe((data) => {
      this.data = data;
    });
  }

  copyText(text: string | undefined, field: 'email' | 'phone'): void {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      this.copiedField = field;
      setTimeout(() => (this.copiedField = null), 2000);
    });
  }
}
