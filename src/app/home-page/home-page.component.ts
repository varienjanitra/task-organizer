import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  newTask: string = 'yes';
  allTasks$: Observable<Task[]>;
  //allTasks: string[] = [];

  constructor(
    private taskService: TaskService
  ) {
    this.allTasks$ = taskService.allTasksList$;
  }

  clearAllTasks() {
    this.taskService.clearAllTasks();
  }

  submitNewTask(taskName: string) {
    if(taskName == '') {
      return;
    }
    let newTask: Task = {
      id: 0,
      name: taskName,
      isDone: false
    }
    this.taskService.addTask(newTask);
    this.newTask = '';
  }

  deleteTask(taskToDelete: Task) {
    this.taskService.deleteTask(taskToDelete);
  }
}
