import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Task {
  id: number,
  name: string,
  description?: string,
  isDone: boolean
}

const dummyTasks: Task[] = [
  {id: 10000, name: 'Feed the Dog', description:' The dog usually likes to eat beef', isDone: false},
  {id: 10001, name: 'Repair the Car Tire', description: 'Dang, the front tyre is soo busted',isDone: true},
  {id: 10002, name: 'Buy Groceries', description: 'Don\'t forget to buy vegetables', isDone: false},
  {id: 10003, name: 'Pick-up Aiko-chan from School', description: 'Dress up Aiko-chan and bring her to the restaurant for wedding anniversary', isDone: false},
  {id: 10004, name: 'Take Done Shoe from Tatsuya Repairs', description: 'Your shoes might be broken, plan to buy new', isDone: true},
  {id: 10005, name: 'Take Haruka to Wedding Anniversary Date', description:'Buy Haruka rings, gosh I really love her', isDone: false}
]

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private globalId: number = 0;
  private _allTasksList$ = new BehaviorSubject<Task[]>(dummyTasks);

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

  toggleDone(taskToToggle: Task) {
    let currentTasksList: Task[] = this._allTasksList$.value;
    let newTasksList: Task[] = currentTasksList.map(task => {
      if(task.id == taskToToggle.id) {
        return {
          ...task,
          isDone: !task.isDone
        };
      }
      return task;
    });
    this._allTasksList$.next(newTasksList);
  }
}
