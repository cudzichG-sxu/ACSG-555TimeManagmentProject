import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../_services/data-handler.service';
import {TaskItemService} from '../_services/taskItem.service';
import {TimerActualService} from '../_services/timerActual.service';
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
  public realTimeCounter = [];
  private timerId = [];
  changeBackground = [];
  changeText = [];
  msg = ['Timer is on!'];
  count = 0;

  constructor(private dataPkg: DataHandlerService,
              private taskService: TaskItemService,
              private timerService: TimerActualService,
              private simpleTimer: SimpleTimer
  ) {
  }

  ngOnInit(): void {
    this.projectName = sessionStorage.getItem('currentProjectName');
    this.projectId = sessionStorage.getItem('currentProjectId');
    this.taskService.getAllTasks(this.projectId).subscribe(returnedTasks => {
      this.returnedTasks = returnedTasks;
      returnedTasks.forEach(x => this.changeBackground.push('main3'));
      returnedTasks.forEach(x => this.changeText.push('Start'));
      returnedTasks.forEach(x => this.realTimeCounter.push(0));
      returnedTasks.forEach(x => this.timerId.push(0));
    });
    this.simpleTimer.newTimer('1sec', 1, true);
  }

  saveTaskItem(): void {
    this.taskService.createTask(this.newTaskItem, this.projectId).subscribe(savedTaskItem => {
      this.returnedTasks.push(savedTaskItem);
      this.changeBackground.push('main3');
      this.changeText.push('Start');
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
        this.changeBackground.splice(index, 1);
        this.changeText.splice(index, 1);
      }
    });
  }

  // tslint:disable-next-line:typedef
  buttonIsClickedChangeBackground(index, taskIdActual) {
    this.count++;
    if (this.changeBackground[index] === 'main3') {
      this.timerService.startTimer(taskIdActual);
      this.changeBackground[index] = 'main4';
      this.timerId[index] = this.simpleTimer.subscribe('1sec', () => this.realTimeCounter[index]++);
    } else {
      this.timerService.stopTimer(taskIdActual);
      this.taskService.getAllTasks(this.projectId).subscribe(returnedTasks => {
        this.returnedTasks = returnedTasks;
      });
      this.changeBackground[index] = 'main3';
      this.simpleTimer.unsubscribe(this.timerId[index]);
      this.timerId[index] = 0;
      this.realTimeCounter[index] = 0;
    }
  }

  // tslint:disable-next-line:typedef
  buttonIsClickedChangeText(index) {
    if (this.changeText[index] === 'Start') {
      this.changeText[index] = 'Stop';
    } else {
      this.changeText[index] = 'Start';
    }
  }

  // tslint:disable-next-line:typedef
  secondsToHms(totalSeconds) {
    if (totalSeconds <= 0) {
      return '00:00:00';
    } else {
      totalSeconds = Number(totalSeconds);
      let h = Math.floor(totalSeconds / 3600);
      let m = Math.floor(totalSeconds % 3600 / 60);
      let s = Math.floor(totalSeconds % 3600 % 60);
      return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
    }
  }
}
