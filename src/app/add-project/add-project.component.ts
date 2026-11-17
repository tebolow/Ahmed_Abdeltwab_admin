import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { DriveUploadService } from '../services/drive/drive-upload.service';
import { MediaUrlPipe } from '../shared/pipes/media-url.pipe';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [MediaUrlPipe],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private driveUpload = inject(DriveUploadService);

  baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  projectId: string | null = null;
  existingProject: any = null;
  categorySuggestions: string[] = ['Web', 'Mobile', 'Desktop', 'AI'];
  skills: string[] = [];
  isSubmitting = false;
  errorMessage = '';

  ngOnInit(): void {
    this.dataService.currentData$.subscribe((data) => {
      if (Array.isArray(data?.portfolioFilters) && data.portfolioFilters.length > 0) {
        this.categorySuggestions = data.portfolioFilters.filter(
          (f: string) => f.toLowerCase() !== 'all'
        );
      }
    });

    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.http.get<any>(`${this.baseURL}/projects/getProject/${this.projectId}`).subscribe({
        next: (res) => {
          this.existingProject = res?.data || null;
          this.skills = Array.isArray(this.existingProject?.skills)
            ? [...this.existingProject.skills]
            : [];
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load project for editing.';
        }
      });
    }
  }

  onSkillKeydown(event: KeyboardEvent, input: HTMLInputElement): void {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      this.addSkill(input);
    }
  }

  addSkill(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value && !this.skills.includes(value)) {
      this.skills.push(value);
      input.value = '';
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter((s) => s !== skill);
  }

  async saveProject(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const raw = new FormData(form);
    const payload = new FormData();

    payload.set('name', String(raw.get('name') || '').trim());
    payload.set('brief', String(raw.get('brief') || '').trim());
    payload.set('description', String(raw.get('description') || '').trim());
    payload.set('category', String(raw.get('category') || '').trim());
    payload.set('skills', JSON.stringify(this.skills));

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const driveSession = await this.driveUpload.getDriveSession();

      const thumb = raw.get('thumb') as File | null;
      if (thumb && thumb.size > 0) {
        if (driveSession.enabled) {
          payload.set('thumb', await this.driveUpload.uploadFileDirect(thumb, driveSession));
        } else {
          payload.set('thumb', thumb);
        }
      }

      const imgs = (raw.getAll('imgs') as File[]).filter((f) => f && f.size > 0);
      if (imgs.length > 0) {
        if (driveSession.enabled) {
          const uploadedImgs = await Promise.all(
            imgs.map((file) => this.driveUpload.uploadFileDirect(file, driveSession))
          );
          payload.set('imgs', JSON.stringify(uploadedImgs));
        } else {
          imgs.forEach((file) => payload.append('imgs', file));
        }
      }

      const video = raw.get('video') as File | null;
      if (video && video.size > 0) {
        if (driveSession.enabled) {
          payload.set('video', await this.driveUpload.uploadFileDirect(video, driveSession));
        } else {
          payload.set('video', video);
        }
      }

      const request$ = this.projectId
        ? this.http.put(`${this.baseURL}/projects/updateProject/${this.projectId}`, payload)
        : this.http.post(`${this.baseURL}/projects/addProject`, payload);

      request$.subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/portfolio']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err?.error?.error || 'Failed to save project.';
        }
      });
    } catch (err: any) {
      this.isSubmitting = false;
      this.errorMessage = err?.message || 'Failed to upload project media to Google Drive.';
    }
  }
}
