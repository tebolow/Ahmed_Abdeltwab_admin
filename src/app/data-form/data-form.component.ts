import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { TechIconComponent } from '../shared/tech-icon/tech-icon.component';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [TechIconComponent],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private dataService = inject(DataService);

  baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  existingData: any = null;
  toolkit: string[] = [
    'Angular',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Node.js',
    'Express.js',
    'MongoDB',
    'REST APIs',
    'Git'
  ];

  logoPreview: string | null = null;
  homeImagePreview: string | null = null;
  aboutImagePreview: string | null = null;
  selectedCvName = '';

  isSubmitting = false;
  statusMessage = '';
  isError = false;

  ngOnInit(): void {
    this.dataService.loadData().subscribe({
      next: (res) => {
        this.existingData = res?.data || null;
        if (Array.isArray(this.existingData?.toolkit) && this.existingData.toolkit.length > 0) {
          this.toolkit = [...this.existingData.toolkit];
        }
      },
      error: (err) => {
        console.error('Failed to load site data:', err);
      }
    });
  }

  ngOnDestroy(): void {
    [this.logoPreview, this.homeImagePreview, this.aboutImagePreview].forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }

  onImageSelected(event: Event, target: 'logo' | 'homeImage' | 'aboutImage'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    if (target === 'logo') {
      if (this.logoPreview) URL.revokeObjectURL(this.logoPreview);
      this.logoPreview = objectUrl;
    } else if (target === 'homeImage') {
      if (this.homeImagePreview) URL.revokeObjectURL(this.homeImagePreview);
      this.homeImagePreview = objectUrl;
    } else {
      if (this.aboutImagePreview) URL.revokeObjectURL(this.aboutImagePreview);
      this.aboutImagePreview = objectUrl;
    }
  }

  onCvSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.selectedCvName = file ? file.name : '';
  }

  onToolkitKeydown(event: KeyboardEvent, input: HTMLInputElement): void {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      this.addToolkitItem(input);
    }
  }

  addToolkitItem(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value && !this.toolkit.includes(value)) {
      this.toolkit.push(value);
      input.value = '';
    }
  }

  removeToolkitItem(item: string): void {
    this.toolkit = this.toolkit.filter((t) => t !== item);
  }

  getLogoSrc(): string {
    if (this.logoPreview) return this.logoPreview;
    if (this.existingData?.logo) return this.staticURL + this.existingData.logo;
    return './Ahmed_Abdeltwab.png';
  }

  getHomeImageSrc(): string {
    if (this.homeImagePreview) return this.homeImagePreview;
    if (this.existingData?.homeImage) return this.staticURL + this.existingData.homeImage;
    return './square.jpeg';
  }

  getAboutImageSrc(): string {
    if (this.aboutImagePreview) return this.aboutImagePreview;
    if (this.existingData?.aboutImage) return this.staticURL + this.existingData.aboutImage;
    return './profile.JPG';
  }

  submitData(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const raw = new FormData(form);
    const payload = new FormData();

    ['name', 'description', 'email', 'phone', 'location', 'availability', 'about'].forEach((field) => {
      payload.set(field, String(raw.get(field) || '').trim());
    });
    payload.set('toolkit', JSON.stringify(this.toolkit));

    ['logo', 'homeImage', 'aboutImage', 'cv'].forEach((fileField) => {
      const file = raw.get(fileField) as File | null;
      if (file && file.size > 0) {
        payload.set(fileField, file);
      }
    });

    this.isSubmitting = true;
    this.statusMessage = '';
    this.isError = false;

    this.http.post<any>(`${this.baseURL}/data/editData`, payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.existingData = res?.data || this.existingData;
        if (res?.data) {
          this.dataService.setData(res.data);
        }
        this.statusMessage = 'Site data saved successfully!';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.isError = true;
        this.statusMessage = err?.error?.error || 'Failed to save site data.';
      }
    });
  }
}
