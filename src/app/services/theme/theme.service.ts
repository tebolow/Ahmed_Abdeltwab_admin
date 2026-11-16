import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'color-scheme';
type ThemeScheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<ThemeScheme>(this.resolveRenderedScheme());

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY) {
          this.applyMeta(event.newValue);
          this.currentTheme.set(this.resolveRenderedScheme());
        }
      });
    }
  }

  private getSystemScheme(): ThemeScheme {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  private getStoredScheme(): ThemeScheme | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private resolveRenderedScheme(): ThemeScheme {
    return this.getStoredScheme() ?? this.getSystemScheme();
  }

  private applyMeta(value: string | null): void {
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', value === 'light' || value === 'dark' ? value : 'light dark');
    }
  }

  toggleTheme(): void {
    const target: ThemeScheme = this.resolveRenderedScheme() === 'dark' ? 'light' : 'dark';
    const system = this.getSystemScheme();

    try {
      if (target === system) {
        localStorage.removeItem(STORAGE_KEY);
        this.applyMeta(null);
      } else {
        localStorage.setItem(STORAGE_KEY, target);
        this.applyMeta(target);
      }
    } catch {
      this.applyMeta(target);
    }

    this.currentTheme.set(target);
  }
}

