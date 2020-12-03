import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectRootComponent } from './project-root/project-root.component';
import { TaskRootComponent } from './task-root/task-root.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:8001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ProjectRootComponent,
    TaskRootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
