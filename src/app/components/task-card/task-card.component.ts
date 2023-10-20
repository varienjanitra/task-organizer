import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from 'src/app/task.service';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task: Task = {
    id: 0,
    name: '',
    description: '',
    isDone: false
  };

  @Input() index?: number = 0;

  constructor(
    private taskService: TaskService
  ) {

  }

  deleteTask(taskToDelete: Task) {
    this.taskService.deleteTask(taskToDelete);
  }

  toggleDone(taskToToggle: Task) {
    this.taskService.toggleDone(taskToToggle);
  }
}
