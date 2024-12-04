import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  http = inject(HttpClient);
  constructor(private router: Router){};
  skills: String[] = [];

  addSkill(skill: any):void {
    if (skill.value) {
      this.skills.push(skill.value);
      skill.value = ""
    }
  }

  removeSkill(skill: any){
    let index = this.skills.indexOf(skill);
    if (index != -1) {
      this.skills.splice(index, 1);
    }
  }

  addProject(e: any) {
    e.preventDefault()
    const formData = new FormData(e.target);
    formData.set(`skills`, JSON.stringify(this.skills));
    this.http.post(`${environment.apiUrl}/projects/addProject`, formData).subscribe((res)=>console.log(res), (err)=>console.log(err))
    this.router.navigate(["/"])
  }
}
