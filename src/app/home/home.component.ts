import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { SocialsComponent } from '../socials/socials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SocialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private dataService = inject(DataService);

  homeData: any = null;
  staticURL = environment.staticURL;

  ngOnInit(): void {
    this.dataService.currentData$.subscribe((data) => {
      this.homeData = data;
    });
  }

  modify(): void {
    this.router.navigate(['/dataForm']);
  }
}
