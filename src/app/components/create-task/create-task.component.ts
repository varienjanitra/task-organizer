import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from 'src/app/task.service';

@Component({
  selector: 'create-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  taskName: string = 'Enter task name here';
  taskDescription: string = 'Enter description here';

  constructor(
    private taskService: TaskService
  ) {}

  submitNewTask(taskName: string) {
    if(taskName == '') {
      return;
    }
    let newTask: Task = {
      id: 0,
      name: taskName,
      description: this.taskDescription,
      isDone: false
    }
    this.taskService.addTask(newTask);
  }
}
