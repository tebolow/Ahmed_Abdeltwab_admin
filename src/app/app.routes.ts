import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { DataFormComponent } from './data-form/data-form.component';
import { SocialsComponent } from './socials/socials.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddSocialComponent } from './add-social/add-social.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [authGuard] },
  { path: 'singleProject/:id', component: SingleProjectComponent, canActivate: [authGuard] },
  { path: 'singleProject', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'dataForm', component: DataFormComponent, canActivate: [authGuard] },
  { path: 'socials', component: SocialsComponent, canActivate: [authGuard] },
  { path: 'addProject', component: AddProjectComponent, canActivate: [authGuard] },
  { path: 'editProject/:id', component: AddProjectComponent, canActivate: [authGuard] },
  { path: 'addSocial', component: AddSocialComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];
