import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.service';
import { Observable, map } from 'rxjs';
import { TaskCardComponent } from '../components/task-card/task-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskCardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  newTask: string = 'yes';
  allTasks$: Observable<Task[]>;
  outstandingTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService
  ) {
    this.allTasks$ = taskService.allTasksList$;

    this.outstandingTasks$ = this.allTasks$.pipe(
      map((tasks: Task[]) => {
        let outstandingTask = tasks.filter(task => task.isDone == false)
        return outstandingTask;
      })
    );

    this.doneTasks$ = this.allTasks$.pipe(
      map((tasks: Task[]) => {
        let doneTasks = tasks.filter(task => task.isDone == true)
        return doneTasks;
      })
    );
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
}
