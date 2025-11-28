import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks-page/tasks-page.component').then(
        (m) => m.TasksPageComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./task/task.component').then((m) => m.TaskComponent),
      },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
