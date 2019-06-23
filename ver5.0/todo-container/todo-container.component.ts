import { Component } from '@angular/core';

import { Todo } from '../todo-interface';
import { Tab } from '../tab-type'

@Component({
  selector: 'app-todo-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">5.0</div>
      <app-todo-form (addTodo)="addTodo($event)"></app-todo-form>
      <app-todo-nav [Tabs]="Tabs" [navState]="navState" (activeTab)="navState = $event"></app-todo-nav>
      <app-todo-list [todos]="todos" [navState]="navState" (completeTodo)="completeTodo($event)" (removeTodo)="removeTodo($event)"></app-todo-list>
      <app-todo-footer (selectAll)="selectAll($event)" [everySelect]="everySelect()" (removeAll)="removeAll()" [todos]="todos" [completeLength]="completeLength()" [incompleteLength]="incompleteLength()"></app-todo-footer>      
    </div>
  <!--
  <pre>{{ todos | json }}</pre>
  -->
  `,
  styleUrls: [
    '../todo-style.css'
  ]
})
export class TodoContainerComponent {

  todos: Todo[];
  Tabs: Tab[] = ['All', 'Active', 'Completed'];
  navState: Tab = 'All';

  constructor() {
    this.getTodos();
  }

  getTodos() {
    setTimeout(() => {
      this.todos = [
        { id: 1, content: "HTML", completed: false },
        { id: 2, content: "CSS", completed: true },
        { id: 3, content: "Javascript", completed: false }
      ]}, 1000)
  }
    
  generateId() {
    return this.todos.length ? Math.max(...this.todos.map( todo => todo.id )) + 1 : 1;
  }

  addTodo(content: HTMLInputElement) {
    if (!content.value.trim()) return;
    this.todos = [{ id: this.generateId(), content: content.value, completed: false }, ...this.todos];
    content.value = '';
  }

  completeTodo(id: number) {
    this.todos = this.todos.map( todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo );
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter( todo => todo.id !== id );
  }

  removeAll() {
    this.todos = this.todos.filter( todo => todo.completed !== true );
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

  selectAll(select: HTMLInputElement) {
    this.todos = this.todos.map( todo => select.checked ? { ...todo, completed: true} : { ...todo, completed: false } );
  }

  everySelect() {
    if (this.todos) {
      return this.todos.every( todo => todo.completed );
    }
  }

}
