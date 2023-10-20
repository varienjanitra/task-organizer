import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Task {
  id: number,
  name: string,
  description?: string,
  isDone: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private globalId: number = 0;
  private _allTasksList$ = new BehaviorSubject<Task[]>([]);

  allTasksList$ = this._allTasksList$.asObservable();

  constructor() {}

  clearAllTasks() {
    this._allTasksList$.next([]);
  }

  addTask(newTask: Task) {

    if(newTask.name == '') {
      return;
    }

    let createdTask: Task = {
      ...newTask,
      id: this.globalId++
    };

    let currentTasksList: Task[] = this._allTasksList$.value;
    let newTasksList = [...currentTasksList, createdTask];

    this._allTasksList$.next(newTasksList);
  }

  deleteTask(taskToDelete: Task) {
    let currentTasksList: Task[] = this._allTasksList$.value;
    let newTasksList = currentTasksList.filter(task => task.id != taskToDelete.id);
    this._allTasksList$.next(newTasksList);
  }
}
