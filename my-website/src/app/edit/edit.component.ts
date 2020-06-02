import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TaskService } from '../task.service';
import { Task } from '../task.model';

import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: String;
  task: any = {};
  updateForm: FormGroup;
  today: Date = new Date();
  myDate: Date = new Date();

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  // creates form, a constructor,
  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      date: '',
      important: '',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.taskService.getTaskById(this.id).subscribe((res) => {
        console.log('res b4 : ', this.task);
        console.log(res);
        this.task = res;
        this.myDate = this.task.date;
        console.log(this.task.date);
        console.log(this.task.important);

        console.log('res after: ', this.task);
        this.updateForm.get('title').setValue(this.task.title);
        this.updateForm.get('description').setValue(this.task.description);
        this.updateForm.get('date').setValue(this.task.date);
        this.updateForm.get('important').setValue(this.task.important);
      });
    });
  }

  updateTask(title, description, date, important) {
    let important_bool = false;
    if (important === 'High') {
      important_bool = true;
    }
    console.log(important);

    this.taskService
      .updateTask(this.id, title, description, date, important_bool)
      .subscribe(() => {
        this.snackBar.open('Task updated successfully', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }
}
