import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import {DataHandlerService} from '../data-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-root',
  templateUrl: './task-root.component.html',
  styleUrls: ['./task-root.component.css']
})

export class TaskRootComponent implements OnInit {
  public projectName;
  public projectId;
  public newTaskItem;
  public tasks;

  constructor(
    private taskServiceService: TaskServiceService,
    private route: Router,
    private dataPkg: DataHandlerService
  ) {

  }

  ngOnInit(): void {
    this.projectName = this.dataPkg.projectName;
    this.projectId = this.dataPkg.projectId;
    console.log(this.projectName);
    console.log(this.projectId);
  }

}
