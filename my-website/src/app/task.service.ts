import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  URI = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${this.URI}/tasks`);
  }

  getTaskById(id) {
    return this.http.get(`${this.URI}/tasks/${id}`);
  }

  addTask(id, title, description, date, important) {
    const task = {
      title: title,
      description: description,
      date: date,
      important: important,
    };
    return this.http.post(`${this.URI}/tasks/add/${id}`, task);
  }

  updateTask(id, title, description, date, important) {
    const task = {
      title: title,
      description: description,
      date: date,
      important: important,
    };
    return this.http.post(`${this.URI}/tasks/update/${id}`, task);
  }

  deleteTask(id) {
    return this.http.get(`${this.URI}/issues/delete/${id}`);
  }
}
