import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './types/todo-interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  appUrl = environment.appUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Todo[]>(this.appUrl);
  }

  create(todo: Todo) {
    return this.http.post<Todo[]>(this.appUrl, todo);
  }

  toggle(id: number, completed: boolean) {
    return this.http.patch<Todo[]>(`${this.appUrl}/${id}`, { completed });
  }

  remove(id: number) {
    return this.http.delete<Todo[]>(`${this.appUrl}/${id}`);
  }

  removeAll() {
    return this.http.delete<Todo[]>(`${this.appUrl}/completed`);
  }

  selectAll(completed: boolean) {
    return this.http.patch<Todo[]>(this.appUrl, { completed });
  }
}
