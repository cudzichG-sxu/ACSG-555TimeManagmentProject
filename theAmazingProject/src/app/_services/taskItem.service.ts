import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {

  constructor(private http: HttpClient) { }

  getAllTasks( projectQueryId ): Observable<any> {
    return this.http.get <any>(`${environment.apiUrl}/allTaskItems/?projectId=${projectQueryId}`);
  }

  createTask(newTaskItem, projectIdActual): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/newTaskItem`, {name: newTaskItem, projectId: projectIdActual});
  }

  deleteTask( taskToBeDeleted ): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/deleteTask/?id=${taskToBeDeleted}`, {});
  }
}
