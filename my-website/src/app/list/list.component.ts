import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { MatTableDataSource } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks: Task[];
  displayedColumns: string[] = [
    'title',
    'description',
    'date',
    'important',
    'actions',
  ];

  // injecting services
  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchTasks();
  }

  // getting the tasks method
  fetchTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      console.log('tasks:');
      console.log(this.tasks);
    });
  }

  // editing task. Use router service to  navigate to edit component
  editTask(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  // deleting task. Use router service to  navigate to edit component
  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.fetchTasks(); // we call this to reload tasks
      this.snackBar.open('Task deleted successfully!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
