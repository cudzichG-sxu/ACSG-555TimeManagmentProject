import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../data-handler.service';

@Component({
  selector: 'app-task-root',
  templateUrl: './task-root.component.html',
  styleUrls: ['./task-root.component.css']
})

export class TaskRootComponent implements OnInit {
  public projectName;
  public projectId;

  constructor(private dataPkg: DataHandlerService) {

  }

  ngOnInit(): void {
    this.projectName = this.dataPkg.projectName;
    this.projectId = this.dataPkg.projectId;
    console.log(this.projectName);
    console.log(this.projectId);
  }

}
