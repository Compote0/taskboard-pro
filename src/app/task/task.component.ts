import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasks$;
  taskForm: FormGroup;
  showForm = false;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.tasks$ = this.taskService.tasks$;
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      status: ['todo', Validators.required],
      priority: ['medium', Validators.required],
    });
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

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.taskService.addTask(newTask);
      this.taskForm.reset({
        status: 'todo',
        priority: 'medium',
      });
      this.showForm = false;
    }
  }

  removeTask(id: number): void {
    this.taskService.removeTask(id);
  }
}
