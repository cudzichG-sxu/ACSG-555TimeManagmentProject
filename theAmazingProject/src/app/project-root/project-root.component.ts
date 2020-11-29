import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';

@Component({
  selector: 'app-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.css']
})
export class ProjectRootComponent implements OnInit {
  public newProjectItem;
  public projects;

  constructor(
    private projectServiceService: ProjectServiceService
  ) { }


  ngOnInit(): void {
    this.projectServiceService.getAllProjects().subscribe(returnProjects => {
      this.projects = returnProjects.docs;
    });
  }
  saveProjectItem(): void {
    this.projectServiceService.create(this.newProjectItem).subscribe(saveProjectItem => {
      this.projects.push(saveProjectItem);
    });
  }
}
