import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

interface TaskStats {
  total: number;
  completed: number;
  active: number;
  percentage: number;
}

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.css',
})
export class TaskStatsComponent {
  private taskService = inject(TaskService);

  stats$: Observable<TaskStats> = this.taskService.tasks$.pipe(
    map((tasks) => {
      const total = tasks.length;
      const completed = tasks.filter((t) => t.completed).length;
      const active = total - completed;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return { total, completed, active, percentage };
    })
  );
}
