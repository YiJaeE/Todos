import { Component, OnInit } from '@angular/core';

import { Todo } from '../types/todo-interface';
import { Tab } from '../types/tab-type';
import { environment } from 'src/environments/environment';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">7.0</div>

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

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    setTimeout(() => {
      this.todoService.getAll()
        .subscribe(todos => this.todos = todos);
    }, 500)
  }
    
  generateId() {
    return this.todos.length ? Math.max(...this.todos.map( todo => todo.id )) + 1 : 1;
  }

  addTodo(content: string) {
    const payload = { id: this.generateId(), content, completed: false }
    this.todoService.create(payload)
      .subscribe(todos => this.todos = todos);
  }

  completeTodo(id: number) {
    const completed = !this.todos.find(todo => todo.id === id).completed;
    this.todoService.toggle(id, completed)
      .subscribe(todos => this.todos = todos);
  }

  removeTodo(id: number) {
    this.todoService.remove(id)
      .subscribe(todos => this.todos = todos);
  }

  removeAll() {
    this.todoService.removeAll()
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
    this.todoService.selectAll(completed)
      .subscribe(todos => this.todos = todos);
  }

  everySelect() {
    if (this.todos) {
      return this.todos.every( todo => todo.completed );
    }
  }

}
