import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  private router = inject(Router);
  private dataService = inject(DataService);

  data: any = null;
  staticURL = environment.staticURL;

  ngOnInit(): void {
    this.dataService.currentData$.subscribe((data) => {
      this.data = data;
    });
  }

  modify(): void {
    this.router.navigate(['/dataForm']);
  }
}
