import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../data-handler.service';
import {TaskServiceService} from '../task-service.service';
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
  selector: 'app-task-root',
  templateUrl: './task-root.component.html',
  styleUrls: ['./task-root.component.css']
})

export class TaskRootComponent implements OnInit {
  public projectName;
  public projectId;
  public newTaskItem;
  public returnedTasks;
  public timerText = 'Start Timer';
  public counter = 0;
  public st;
  public timerId;

  constructor(private dataPkg: DataHandlerService,
              private taskService: TaskServiceService,
              private simpleTimer: SimpleTimer
  ) {

  }

  ngOnInit(): void {
    this.projectName = sessionStorage.getItem('currentProjectName');
    this.projectId = sessionStorage.getItem('currentProjectId');
    this.taskService.getAllTasks(this.projectId).subscribe(returnedTasks => {
      this.returnedTasks = returnedTasks;
    });
    this.st = this.simpleTimer.newTimer('1sec', 1, true);
  }

  saveTaskItem(): void {
    this.taskService.createTask(this.newTaskItem, this.projectId).subscribe(savedTaskItem => {
      this.returnedTasks.push(savedTaskItem);
      // clears out text field on page for cleaner UI
      this.newTaskItem = '';
    });
  }

  deleteTask(taskIdMarked, index): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.taskService.deleteTask(taskIdMarked).subscribe(taskIdMarked => {

      // tslint:disable-next-line:triple-equals
      if (index != -1) {
        this.returnedTasks.splice(index, 1);
      }
    });
  }

  timer(): void {
    if (this.timerText === 'Start Timer') {
      this.timerText = 'Stop Timer';
      this.timerId = this.simpleTimer.subscribe('1sec', () => this.counter++);
    }
    else {
      this.timerText = 'Start Timer';
      this.simpleTimer.unsubscribe(this.timerId);
    }
  }
}
