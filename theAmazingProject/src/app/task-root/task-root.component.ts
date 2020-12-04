import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../data-handler.service';
import {TaskServiceService} from '../task-service.service';
import {TimerServiceService} from '../timer-service.service';


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
  public oneClick = true;
  count = 0;
  msg; string = [];


  constructor(private dataPkg: DataHandlerService,
              private taskService: TaskServiceService,
              private timerService: TimerServiceService,
  ) {
  }

  ngOnInit(): void {
    this.projectName = sessionStorage.getItem('currentProjectName');
    this.projectId = sessionStorage.getItem('currentProjectId');
    this.taskService.getAllTasks(this.projectId).subscribe(returnedTasks => {
      this.returnedTasks = returnedTasks;
    });
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

  startTimer(taskIdActual): void {
    if (this.count % 2 === 1) {
      this.timerService.startTimer(taskIdActual);
    }
  }

  stopTimer(taskIdActual): void {
    if (this.count % 2 === 0) {
      this.timerService.stopTimer(taskIdActual);
    }
  }

  updateBtn(): void {
    this.count++;
    if (this.count % 2 === 1) {
      this.msg = 'Timer is running';
    }else{
      this.msg = 'Actual Time Recorded';
    }
    this.oneClick = !this.oneClick;
  }
}
