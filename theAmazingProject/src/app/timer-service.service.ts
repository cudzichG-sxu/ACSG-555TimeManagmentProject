import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TimerServiceService {

  constructor(private http: HttpClient,
              private socket: Socket
  ) {}

  startTimer(taskId): void {
    this.socket.emit('start', taskId);
  }

  stopTimer(taskId): void {
    this.socket.emit('start', taskId);
  }


}
