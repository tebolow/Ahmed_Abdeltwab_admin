import { Component } from '@angular/core';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [],
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.css'
})
export class SingleProjectComponent {
  index = 0;
  srcs = [
    "./light_mode.png",
    "./dark_mode.png"
  ]
  mainImg = this.srcs[0];

  changeImg(event: any){
    this.mainImg = event.target.src;
  }
}
