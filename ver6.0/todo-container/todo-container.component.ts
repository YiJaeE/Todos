import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '../types/todo-interface';
import { Tab } from '../types/tab-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">6.0</div>

      <app-todo-form (add)="addTodo($event)"></app-todo-form>
      <app-todo-nav [Tabs]="Tabs" [navState]="navState" (activeTab)="navState = $event"></app-todo-nav>
      <app-todo-list [todos]="todos" [navState]="navState" (completeTodo)="completeTodo($event)" 
      (removeTodo)="removeTodo($event)"></app-todo-list>
      <app-todo-footer (selectAll)="selectAll($event)" [everySelect]="everySelect()" (removeAll)="removeAll()" 
      [todos]="todos" [completeLength]="completeLength()" [incompleteLength]="incompleteLength()"></app-todo-footer>
    </div>
  <!--
  <pre>{{ todos | json }}</pre>
  -->
  `,
  styleUrls: [
    '../todo-style.css'
  ]
})
export class TodoContainerComponent implements OnInit {

  todos: Todo[];
  Tabs: Tab[] = ['All', 'Active', 'Completed'];
  navState: Tab = 'All';

  appUrl = environment.appUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    setTimeout(() => {
      this.http.get<Todo[]>(this.appUrl)
        .subscribe(todos => this.todos = todos);
    }, 500)
  }
    
  generateId() {
    return this.todos.length ? Math.max(...this.todos.map( todo => todo.id )) + 1 : 1;
  }

  addTodo(content: string) {
    this.http.post<Todo[]>(this.appUrl, { id: this.generateId(), content, completed: false })
      .subscribe(todos => this.todos = todos);
  }

  completeTodo(id: number) {
    const completed = !this.todos.find(todo => todo.id === id).completed;
    this.http.patch<Todo[]>(`${this.appUrl}/${id}`, { completed })
      .subscribe(todos => this.todos = todos);
  }

  removeTodo(id: number) {
    this.http.delete<Todo[]>(`${this.appUrl}/${id}`)
      .subscribe(todos => this.todos = todos);
  }

  removeAll() {
    this.http.delete<Todo[]>(`${this.appUrl}/completed`)
      .subscribe(todos => this.todos = todos);
  }

  incompleteLength() {
    if (this.todos) {
      return this.todos.filter( todo => !todo.completed ).length;
    }
}

  completeLength() {
    if (this.todos) {
      return this.todos.filter( todo => todo.completed ).length;
    }
  }

  selectAll(completed: boolean) {
    this.http.patch<Todo[]>(this.appUrl, { completed })
      .subscribe(todos => this.todos = todos);
  }

  everySelect() {
    if (this.todos) {
      return this.todos.every( todo => todo.completed );
    }
  }

}
