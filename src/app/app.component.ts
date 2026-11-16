import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private dataService = inject(DataService);
  title = 'Ahmed_Abdeltwab_Admin';

  ngOnInit(): void {
    this.dataService.loadData().subscribe({
      error: (err) => console.error('Failed to load site data:', err)
    });
  }
}
