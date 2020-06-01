import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: [ './create.component.scss' ]
})
export class CreateComponent implements OnInit {
	createForm: FormGroup;
	myDate = new Date();

	constructor(private taskService: TaskService, private fb: FormBuilder, private router: Router) {
		this.createForm = this.fb.group({
			title: [ '', Validators.required ],
			description: '',
			date: '',
			important: ''
		});
	}

	// function to add task, using task service
	addTask(title, description, date, important) {
		this.taskService.addTask(title, description, date, important).subscribe(() => {
			this.router.navigate([ '/list' ]);
		});
	}

	ngOnInit(): void {}
}
