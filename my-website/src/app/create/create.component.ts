import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TaskService } from '../task.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: [ './create.component.scss' ]
})
export class CreateComponent implements OnInit {
	createForm: FormGroup;
	myDate = new Date();

	constructor(
		private taskService: TaskService,
		private fb: FormBuilder,
		private router: Router,
		private snackBar: MatSnackBar
	) {
		this.createForm = this.fb.group({
			title: [ '', Validators.required ],
			description: '',
			date: '',
			important: ''
		});
	}

	// function to add task, using task service
	addTask(title, description, date, important) {
		let important_bool = false;
		if (important === 'High') {
			important_bool = true;
		}
		this.taskService.addTask(title, description, date, important_bool).subscribe(() => {
			this.router.navigate([ '/list' ]);
			this.snackBar.open('Task added successfully!', 'OK', {
				duration: 3000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
		});
	}

	ngOnInit(): void {}
}
