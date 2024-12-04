import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  http = inject(HttpClient);
  projects: any;
  baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  constructor(private router: Router){}

  ngOnInit(): void {
    this.http.get(`${this.baseURL}/projects/getProjects`).subscribe((res) => {
      this.projects = res;
      console.log(this.projects);
    }, (err) => {
      console.log(err);
    })
  }
  goToSingleProject(){
    this.router.navigate([`singleProject`])
  }
  goToAddProject(){
    this.router.navigate([`addProject`])
  }
}
