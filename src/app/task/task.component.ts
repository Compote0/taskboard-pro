import {
  Component,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { ConfettiService } from '../services/confetti.service';
import { TaskStatsComponent } from '../features/tasks/task-stats/task-stats.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  LucideAngularModule,
  Check,
  RotateCcw,
  Pin,
  PinOff,
  Trash2,
} from 'lucide-angular';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskStatsComponent,
    LucideAngularModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  animations: [
    trigger('taskAnimation', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
          boxShadow: '0 4px 15px rgba(255, 180, 140, 0.2)',
        })
      ),
      state(
        'pinned',
        style({
          transform: 'scale(1.02)',
          boxShadow: '0 8px 25px rgba(255, 180, 140, 0.4)',
          borderLeft: '4px solid #ffb88c',
        })
      ),
      transition('normal => pinned', [
        animate(
          '0.3s ease-out',
          style({
            transform: 'scale(1.05)',
            boxShadow: '0 12px 30px rgba(255, 180, 140, 0.5)',
          })
        ),
        animate('0.2s ease-in'),
      ]),
      transition('pinned => normal', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class TaskComponent implements OnInit, AfterViewInit, OnDestroy {
  tasks$;
  tasks: Task[] = [];
  taskForm: FormGroup;
  showForm = false;
  private tasksSubscription?: Subscription;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private confettiService: ConfettiService,
    private cdr: ChangeDetectorRef
  ) {
    this.tasks$ = this.taskService.tasks$;
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      status: ['todo', Validators.required],
      priority: ['medium', Validators.required],
    });
  }

  ngOnInit(): void {
    // S'abonner immédiatement pour charger les tâches
    this.tasksSubscription = this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    // Force la détection des changements après que la vue soit complètement initialisée
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnDestroy(): void {
    // Nettoyer l'abonnement
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.taskForm.reset({
        status: 'todo',
        priority: 'medium',
      });
    }
  }

  // Icônes pour le template
  Check = Check;
  RotateCcw = RotateCcw;
  Pin = Pin;
  PinOff = PinOff;
  Trash2 = Trash2;

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        completed: false,
        pinned: false,
      };
      this.taskService.addTask(newTask);
      this.taskForm.reset({
        status: 'todo',
        priority: 'medium',
      });
      this.showForm = false;
      this.confettiService.triggerConfetti();
    }
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  pinTask(id: number): void {
    this.taskService.pinTask(id);
  }

  removeTask(id: number): void {
    this.taskService.removeTask(id);
    this.confettiService.triggerConfetti();
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
