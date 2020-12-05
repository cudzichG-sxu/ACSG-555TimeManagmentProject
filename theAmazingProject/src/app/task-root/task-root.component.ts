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
  count = 0;
  msg;
  changeBackground = ['main3'];
  changeText = ['Start'];

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
      returnedTasks.forEach(x => this.changeBackground.push('main3'));
      returnedTasks.forEach(x => this.changeText.push('Start'));
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

  updateBtn(taskIdActual): void {
    this.count++;
    if (this.count % 2 === 1) {
      this.timerService.startTimer(taskIdActual);
      this.msg = 'Timer is running';
    }else{
      this.timerService.stopTimer(taskIdActual);
      this.msg = 'Actual Time Recorded';
    }
  }

  // tslint:disable-next-line:typedef
  buttonIsClickedChangeBackground(index) {
    if (this.changeBackground[index] === 'main3') {
      this.changeBackground[index] = 'main4';
    } else {
      this.changeBackground[index] = 'main3';
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
    totalSeconds = Number(totalSeconds);
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor(totalSeconds % 3600 / 60);
    let s = Math.floor(totalSeconds % 3600 % 60);
    return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
  }
}
