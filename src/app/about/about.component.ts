import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  http = inject(HttpClient);
  homeData: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.homeData = this.http.get(`http://localhost:2300/data/getData`);
    console.log(this.homeData);
  }

  modify(){
    this.router.navigate([`/dataForm`])
  }
}
