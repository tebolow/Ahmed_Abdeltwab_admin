import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { TechIconComponent } from '../shared/tech-icon/tech-icon.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TechIconComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private dataService = inject(DataService);

  readonly defaultFilters = ['All', 'Web', 'Mobile', 'Desktop', 'AI'];
  projects: any[] = [];
  filters: string[] = [...this.defaultFilters];
  selectedCategory = 'All';
  managingFilters = false;
  editingFilterIndex: number | null = null;
  filterStatus = '';

  baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.dataService.currentData$.subscribe((data) => {
      if (Array.isArray(data?.portfolioFilters) && data.portfolioFilters.length > 0) {
        this.filters = [...data.portfolioFilters];
        if (!this.filters.includes(this.selectedCategory)) {
          this.selectedCategory = this.filters[0];
        }
      }
    });
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.isLoading = true;
    this.http.get<any>(`${this.baseURL}/projects/getProjects`).subscribe({
      next: (res) => {
        this.projects = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load projects.';
        this.isLoading = false;
      }
    });
  }

  get filteredProjects(): any[] {
    if (this.selectedCategory.toLowerCase() === 'all') {
      return this.projects;
    }
    return this.projects.filter(
      (p) => (p?.category || '').trim().toLowerCase() === this.selectedCategory.trim().toLowerCase()
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  toggleManageFilters(): void {
    this.managingFilters = !this.managingFilters;
    this.editingFilterIndex = null;
    this.filterStatus = '';
  }

  addFilter(input: HTMLInputElement): void {
    const val = input.value.trim();
    if (!val || this.filters.some((f) => f.toLowerCase() === val.toLowerCase())) {
      return;
    }
    this.filters = [...this.filters, val];
    input.value = '';
    this.persistFilters();
  }

  startEditFilter(index: number): void {
    this.editingFilterIndex = index;
  }

  saveEditFilter(index: number, input: HTMLInputElement): void {
    const val = input.value.trim();
    if (!val) return;
    const updated = [...this.filters];
    updated[index] = val;
    this.filters = updated;
    this.editingFilterIndex = null;
    this.persistFilters();
  }

  removeFilter(index: number): void {
    const removed = this.filters[index];
    this.filters = this.filters.filter((_, i) => i !== index);
    if (this.selectedCategory === removed) {
      this.selectedCategory = this.filters[0] || 'All';
    }
    this.persistFilters();
  }

  private persistFilters(): void {
    this.http.put<any>(`${this.baseURL}/data/updateFilters`, { portfolioFilters: this.filters }).subscribe({
      next: (res) => {
        if (res?.data) {
          this.dataService.setData(res.data);
        }
        this.filterStatus = 'Filters updated on main site.';
      },
      error: (err) => {
        console.error(err);
        this.filterStatus = err?.error?.error || 'Failed to save filters.';
      }
    });
  }

  goToSingleProject(id: string): void {
    this.router.navigate(['/singleProject', id]);
  }

  goToAddProject(): void {
    this.router.navigate(['/addProject']);
  }

  goToEditProject(id: string): void {
    this.router.navigate(['/editProject', id]);
  }

  deleteProject(project: any): void {
    if (!confirm(`Delete project "${project.name}"? This will also remove its uploaded media.`)) {
      return;
    }
    this.http.delete(`${this.baseURL}/projects/deleteProject/${project._id}`).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p._id !== project._id);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.error?.error || 'Failed to delete project.';
      }
    });
  }
}
