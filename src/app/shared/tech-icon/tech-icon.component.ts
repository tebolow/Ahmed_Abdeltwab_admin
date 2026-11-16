import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  template: `
    <span class="tech-icon" aria-hidden="true">
      @switch (normalized) {
        @case ('angular') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2 3 5.5l1.4 11.2L12 22l7.6-5.3L21 5.5 12 2z" />
            <path d="m8.5 15.5 3.5-8 3.5 8M9.7 13h4.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('react') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse cx="12" cy="12" rx="9" ry="3.8" />
            <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
          </svg>
        }
        @case ('typescript') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M7.5 11h5M10 11v6M17 11.5c-.7-.5-1.8-.6-2.5-.1-.7.5-.7 1.5 0 2 .6.4 1.9.6 2.4 1.1.6.6.5 1.7-.2 2.1-.8.5-2 .4-2.7-.2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('javascript') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M11 10v5.2c0 1.1-.7 1.8-1.7 1.8-.7 0-1.3-.3-1.6-.8M17.2 11.2c-.6-.5-1.6-.6-2.2-.1-.6.5-.6 1.3 0 1.8.6.5 1.8.6 2.3 1.2.5.6.4 1.6-.3 2-.8.5-1.9.4-2.6-.2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('html') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 3h16l-1.5 15L12 21l-6.5-3L4 3z" stroke-linejoin="round" />
            <path d="M8.5 8h7l-.3 3H9l.3 3 2.7.9 2.7-.9.2-1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('css') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 3h16l-1.5 15L12 21l-6.5-3L4 3z" stroke-linejoin="round" />
            <path d="M8 8h8l-.5 3.5H10m5.5 0-.4 3-3.1 1-3.1-1-.1-1.3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('node') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5z" stroke-linejoin="round" />
            <path d="M9.5 15V9l5 6V9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('express') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M7.5 14.5V9.5h3.2M7.5 12h2.6M13.5 9.5l3 5M16.5 9.5l-3 5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('mongodb') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2.5c3.5 4 5.5 7.4 5.5 11.2 0 3.2-2.2 5.6-5.5 7.8-3.3-2.2-5.5-4.6-5.5-7.8 0-3.8 2-7.2 5.5-11.2z" stroke-linejoin="round" />
            <path d="M12 9v12.5" stroke-linecap="round" />
          </svg>
        }
        @case ('database') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
            <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13" />
            <path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
          </svg>
        }
        @case ('git') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="6" cy="6" r="2.2" />
            <circle cx="18" cy="8" r="2.2" />
            <circle cx="6" cy="18" r="2.2" />
            <path d="M6 8.2v7.6M8.2 6h5.3a2.5 2.5 0 0 1 2.5 2.5v0" stroke-linecap="round" />
          </svg>
        }
        @case ('api') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 12h4l2-4 4 8 2-4h4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @case ('docker') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M3 13h17c-.5 4-3.5 7-8.5 7C6.5 20 3.5 17 3 13z" stroke-linejoin="round" />
            <path d="M6 10h3v3H6zm4 0h3v3h-3zm4 0h3v3h-3zm-4-3h3v3h-3z" />
          </svg>
        }
        @case ('tailwind') {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6.5 10.5c1-2.5 2.8-3.5 5.2-3.5 3.2 0 3.8 2.4 5.5 2.8 1.2.3 2.3-.2 3.3-1.3-1 2.5-2.8 3.5-5.2 3.5-3.2 0-3.8-2.4-5.5-2.8-1.2-.3-2.3.2-3.3 1.3zm-3 5c1-2.5 2.8-3.5 5.2-3.5 3.2 0 3.8 2.4 5.5 2.8 1.2.3 2.3-.2 3.3-1.3-1 2.5-2.8 3.5-5.2 3.5-3.2 0-3.8-2.4-5.5-2.8-1.2-.3-2.3.2-3.3 1.3z" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        @default {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
      }
    </span>
  `,
  styles: [`
    .tech-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 17px;
      height: 17px;
      color: var(--accent);
      flex-shrink: 0;
    }
    .tech-icon svg {
      width: 100%;
      height: 100%;
    }
  `]
})
export class TechIconComponent {
  @Input() name = '';

  get normalized(): string {
    const v = (this.name || '').trim().toLowerCase();
    if (v.includes('angular')) return 'angular';
    if (v.includes('react') || v.includes('next')) return 'react';
    if (v.includes('typescript') || v === 'ts') return 'typescript';
    if (v.includes('javascript') || v === 'js') return 'javascript';
    if (v.includes('html')) return 'html';
    if (v.includes('tailwind')) return 'tailwind';
    if (v.includes('css') || v.includes('sass') || v.includes('bootstrap')) return 'css';
    if (v.includes('node')) return 'node';
    if (v.includes('express') || v.includes('nest')) return 'express';
    if (v.includes('mongo')) return 'mongodb';
    if (v.includes('sql') || v.includes('postgres') || v.includes('redis') || v.includes('prisma')) return 'database';
    if (v.includes('git')) return 'git';
    if (v.includes('api') || v.includes('rest') || v.includes('graphql')) return 'api';
    if (v.includes('docker')) return 'docker';
    return 'default';
  }
}

