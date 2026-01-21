import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, shareReplay, startWith } from 'rxjs/operators';
import { NotificationService } from './notification.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  pinned: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private notificationService = inject(NotificationService);
  private mockTasks: Task[] = [
    {
      id: 1,
      title: 'Design user interface',
      description: 'Create mockups for the main dashboard',
      status: 'todo',
      priority: 'high',
      completed: false,
      pinned: true,
    },
    {
      id: 2,
      title: 'Implement authentication',
      description: 'Add login and registration functionality',
      status: 'in-progress',
      priority: 'high',
      completed: false,
      pinned: false,
    },
    {
      id: 3,
      title: 'Write unit tests',
      description: 'Add tests for task service',
      status: 'todo',
      priority: 'medium',
      completed: false,
      pinned: false,
    },
    {
      id: 4,
      title: 'Update documentation',
      description: 'Update README with new features',
      status: 'done',
      priority: 'low',
      completed: true,
      pinned: false,
    },
    {
      id: 5,
      title: 'Fix bug in header',
      description: 'Resolve navigation issue on mobile',
      status: 'in-progress',
      priority: 'medium',
      completed: false,
      pinned: false,
    },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.mockTasks);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable().pipe(
    map((tasks) =>
      [...tasks].sort((a, b) => {
        // Trier : pinned en premier, puis par id
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return a.id - b.id;
      })
    ),
    tap((tasks) => console.log('📋 Nombre de tâches:', tasks.length)),
    shareReplay(1)
  );

  // Filtrage avec map()
  public activeTasks$: Observable<Task[]> = this.tasks$.pipe(
    map((tasks) => tasks.filter((t) => !t.completed))
  );

  public completedTasks$: Observable<Task[]> = this.tasks$.pipe(
    map((tasks) => tasks.filter((t) => t.completed))
  );

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Omit<Task, 'id'>): void {
    const currentTasks = this.tasksSubject.value;
    const newId = Math.max(...currentTasks.map((t) => t.id), 0) + 1;
    const newTask: Task = {
      ...task,
      id: newId,
      completed: task.completed ?? false,
      pinned: task.pinned ?? false,
    };
    this.tasksSubject.next([...currentTasks, newTask]);
    // Notification
    this.notificationService.show(
      `Tâche "${newTask.title}" ajoutée !`,
      'success'
    );
  }

  removeTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.find((t) => t.id === id);
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    this.tasksSubject.next(updatedTasks);
    // Notification
    if (task) {
      this.notificationService.show(`Tâche "${task.title}" supprimée`, 'info');
    }
  }

  toggleTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.find((t) => t.id === id);
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
    // Notification
    if (task) {
      const newStatus = updatedTasks.find((t) => t.id === id)?.completed
        ? 'terminée'
        : 'réactivée';
      this.notificationService.show(
        `Tâche "${task.title}" ${newStatus}`,
        'success'
      );
    }
  }

  updateTask(id: number, updates: Partial<Task>): void {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.find((t) => t.id === id);
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    this.tasksSubject.next(updatedTasks);
    // Notification
    if (task && updates.title) {
      this.notificationService.show(
        `Tâche "${task.title}" mise à jour`,
        'success'
      );
    }
  }

  pinTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.find((t) => t.id === id);
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, pinned: !task.pinned } : task
    );
    this.tasksSubject.next(updatedTasks);
    // Notification
    if (task) {
      const newStatus = updatedTasks.find((t) => t.id === id)?.pinned
        ? 'épinglée'
        : 'désépinglée';
      this.notificationService.show(
        `Tâche "${task.title}" ${newStatus}`,
        'success'
      );
    }
  }
}
