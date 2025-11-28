import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tasks', component: TaskComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
