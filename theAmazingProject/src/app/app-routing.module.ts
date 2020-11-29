import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectRootComponent} from './project-root/project-root.component';
import {TaskRootComponent} from './task-root/task-root.component';
import { HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {path: 'project-root', component: ProjectRootComponent},
  {path: 'task-root', component: TaskRootComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
