import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TaskService } from '../task.service';
import { Task } from '../task.model';

import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: [ './edit.component.scss' ]
})
export class EditComponent implements OnInit {
	id: String;
	task: any = {};
	updateForm: FormGroup;
	myDate: Date = new Date();

	constructor(
		private taskService: TaskService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBar: MatSnackBarModule
	) {
		this.createForm();
	}

	// creates form, a constructor,
	createForm() {
		this.updateForm = this.fb.group({
			title: [ '', Validators.required ],
			description: '',
			date: '',
			important: ''
		});
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			console.log('params: ', params);
			this.id = params.id;
			console.log('before');
			this.taskService.getTaskById(this.id).subscribe((res) => {
				console.log('after');

				console.log('res: ', res);
				this.task = res;
				this.updateForm.get('title').setValue(this.task.title);
				this.updateForm.get('description').setValue(this.task.description);
				this.updateForm.get('date').setValue(this.task.date);
				this.updateForm.get('important').setValue(this.task.important);
			});
		});
	}

	updateTask(title, description, date, important) {
		this.taskService.updateTask(this.id, title, description, date, important).subscribe(() => {
			// this.snackBar.open('Task updated successfully', 'OK', {
			// duration: 3000
			// });
		});
	}
}
