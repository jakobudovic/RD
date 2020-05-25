import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      date: '',
      important: '',
    });
  }

  // function to add task
  addTask(title, description, date, important) {
    this.taskService
      .addTask(title, description, date, important)
      .subscribe(() => {
        this.router.navigate(['/list']);
      });
  }

  ngOnInit(): void {}
}
