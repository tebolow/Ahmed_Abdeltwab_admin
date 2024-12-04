import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  homeData: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.homeData = this.http.get(`http://localhost:2300/data/getData`);
  }

  modify(){
    this.router.navigate([`/dataForm`])
  }
}
