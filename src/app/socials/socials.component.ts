import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent implements OnInit{
  socials: any;
  http = inject(HttpClient);
  constructor(private router: Router) {};

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/socials/getSocials`).subscribe((res) => {
      this.socials = res;
      console.log(this.socials);
    }, (err) => {
      console.log(err);
    });
  }

  goToAddSocial() {
    console.log("redirecting");
    this.router.navigate([`addSocial`])
  }
}
