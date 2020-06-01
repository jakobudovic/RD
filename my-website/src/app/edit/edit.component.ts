import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: [ './edit.component.scss' ]
})
export class EditComponent implements OnInit {
	id: String;
	task: any = {};
	updateForm: FormGroup;

	constructor(
		private taskService: TaskService,
		private fb: FormBuilder,
		private router: Router,
		private snackBar: MatSnackBarModule
	) {
		// this.createForm();
	}

	createForm() {
		this.updateForm = this.fb.group({
			title: [ '', Validators.required ],
			description: '',
			date: '',
			important: ''
		});
	}

	ngOnInit(): void {}
}
