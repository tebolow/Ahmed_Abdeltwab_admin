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

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "portfolio",
        component: PortfolioComponent
    },
    {
        path: "singleProject",
        component: SingleProjectComponent
    },
    {
        path: `dataForm`,
        component: DataFormComponent
    },
    {
        path: `socials`,
        component: SocialsComponent
    },
    {
        path: `addProject`,
        component: AddProjectComponent
    },
    {
        path: `addSocial`,
        component: AddSocialComponent
    }
];
