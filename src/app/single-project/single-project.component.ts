import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TechIconComponent } from '../shared/tech-icon/tech-icon.component';
import { MediaUrlPipe } from '../shared/pipes/media-url.pipe';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [TechIconComponent, MediaUrlPipe],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.css'
})
export class SingleProjectComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  project: any = null;
  galleryImages: string[] = [];
  mainImg = '';
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/portfolio']);
      return;
    }

    this.http.get<any>(`${this.baseURL}/projects/getProject/${id}`).subscribe({
      next: (res) => {
        this.project = res?.data || null;
        if (this.project) {
          const all = [this.project.thumb, ...(this.project.imgs || [])].filter(Boolean);
          this.galleryImages = Array.from(new Set(all));
          this.mainImg = this.galleryImages[0] || '';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Project not found.';
        this.isLoading = false;
      }
    });
  }

  selectImage(imgPath: string): void {
    this.mainImg = imgPath;
  }

  goBack(): void {
    this.router.navigate(['/portfolio']);
  }

  editProject(): void {
    if (this.project?._id) {
      this.router.navigate(['/editProject', this.project._id]);
    }
  }
}
