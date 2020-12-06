import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class TimerActualService {

  constructor(private timerSocket: Socket) { }
  startTimer(taskId): void {
    this.timerSocket.emit('start-timer', {timerStarted: true, taskIdActual: taskId});
  }
  stopTimer(taskId): void {
    this.timerSocket.emit('start-timer', {timerStarted: false, taskIdActual: taskId});
  }
}
