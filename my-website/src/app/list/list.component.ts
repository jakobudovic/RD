import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks: Task[];

  // injecting services
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log('tasks:');
      console.log(tasks);
    });
  }

  // getting the tasks method
  fetchTasks() {}
}
