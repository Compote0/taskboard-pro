import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private mockTasks: Task[] = [
    {
      id: 1,
      title: 'Design user interface',
      description: 'Create mockups for the main dashboard',
      status: 'todo',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Implement authentication',
      description: 'Add login and registration functionality',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Write unit tests',
      description: 'Add tests for task service',
      status: 'todo',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Update documentation',
      description: 'Update README with new features',
      status: 'done',
      priority: 'low'
    },
    {
      id: 5,
      title: 'Fix bug in header',
      description: 'Resolve navigation issue on mobile',
      status: 'in-progress',
      priority: 'medium'
    }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks).pipe(delay(500));
  }
}

