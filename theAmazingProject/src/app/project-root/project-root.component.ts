import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
import { Router } from '@angular/router';
import {DataHandlerService} from '../data-handler.service';

@Component({
  selector: 'app-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.css']
})
export class ProjectRootComponent implements OnInit {
  public newProjectItem;
  public projects;

  constructor(
    private projectServiceService: ProjectServiceService,
    private route: Router,
    private dataPkg: DataHandlerService
  ) { }


  ngOnInit(): void {
    this.projectServiceService.getAllProjects().subscribe(returnProjects => {
      this.projects = returnProjects;
    });
  }

  viewProjectTasks(selectedProject): void {
    this.dataPkg.projectId = selectedProject._id;
    this.dataPkg.projectName = selectedProject.name;
    this.route.navigate(['task-root']);
  }
  saveProjectItem(): void {
    this.projectServiceService.create(this.newProjectItem).subscribe(saveProjectItem => {
      this.projects.push(saveProjectItem);
      // clears out text field on page for cleaner UI
      this.newProjectItem = '';
    });
  }

  deleteProjectItem(projectIdMarked, index): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.projectServiceService.delete(projectIdMarked).subscribe(projectIdMarked => {

      // tslint:disable-next-line:triple-equals
      if (index != -1) {
        this.projects.splice(index, 1);
      }
    });
  }
}
