import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-data-form',
  standalone: true,
  imports: [],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent implements OnInit{
  http = inject(HttpClient);
  data: any;
  baseURL = environment.apiUrl;

  ngOnInit(): void {
    this.data = this.http.get(`${this.baseURL}/data/getData`);
    if (this.data) {
      console.log(this.data);
    }
    else {
      console.log(`else`);
    }
  }

  submitData() {

  }
}
