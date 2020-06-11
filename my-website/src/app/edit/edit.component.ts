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
	styleUrls: [ './edit.component.scss' ]
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
			title: [ '', Validators.required ],
			description: '',
			date: '',
			important: ''
		});
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params.id;
			this.taskService.getTaskById(this.id).subscribe((res) => {
				this.task = res; // assigns our task value of our received object
				this.myDate = this.task.date; // updates myDate value to our task's date
				this.updateForm.get('title').setValue(this.task.title);
				this.updateForm.get('description').setValue(this.task.description);
				this.updateForm.get('important').setValue('Low');
				if (this.task.important) {
					this.updateForm.get('important').setValue('High');
				}
			});
		});
	}

	updateTask(title, description, date, important) {
		let important_bool = false;
		if (important === 'High') {
			important_bool = true;
		}
		console.log(important);

		this.taskService.updateTask(this.id, title, description, date, important_bool).subscribe(() => {
			this.router.navigate([ '/list' ]);
			this.snackBar.open('Task updated successfully!', 'OK', {
				duration: 3000,
				horizontalPosition: 'center',
				verticalPosition: 'top'
			});
		});
	}
}
