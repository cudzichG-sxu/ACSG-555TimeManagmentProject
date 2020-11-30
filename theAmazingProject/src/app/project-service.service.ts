import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private http: HttpClient) {

  }

  getAllProjects(): Observable<any> {
    return this.http.get <any>(`${environment.apiUrl}/allProjects`);
  }

  create(newProjectItem): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/newProjectItem`, {name: newProjectItem});
  }

  delete( projectToBeDeleted ): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/deleteProject/?id=${projectToBeDeleted}`, {});
  }
}
