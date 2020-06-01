import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { TaskService } from './task.service';
import { ListComponent } from './list/list.component';

// angular material:
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
	{ path: 'create', component: CreateComponent },
	{ path: 'edit/:id', component: EditComponent },
	{ path: 'list', component: ListComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
	declarations: [ AppComponent, HomeComponent, AboutComponent, ListComponent, CreateComponent, EditComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		ReactiveFormsModule,
		MatToolbarModule,
		MatSliderModule,
		MatDividerModule,
		MatCardModule,
		MatButtonModule,
		MatTableModule,
		MatSnackBarModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule
	],
	providers: [ TaskService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
