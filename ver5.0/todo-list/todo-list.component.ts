import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Todo } from '../todo-interface';
import { Tab } from '../tab-type'

@Component({
  selector: 'app-todo-list',
  template: `
    <ul class="todos" *ngIf="todos; else loading">
      <li class="todo-item" *ngFor="let todo of todos | todosFilter: navState">
        <input class="custom-checkbox" type="checkbox" id="ck-{{todo.id}}" [checked]="todo.completed" (change)="completeTodo.emit(todo.id)">
        <label for="ck-{{todo.id}}">{{todo.content}}</label>
        <i class="remove-todo far fa-times-circle" (click)="removeTodo.emit(todo.id)"></i>
      </li>
    </ul>
    <ng-template #loading><div class="loader">Loading...</div></ng-template>
  `,
  styleUrls: [
    '../todo-style.css',
    '../spinner.style.css'
  ]
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Input() navState: Tab;


  @Output() completeTodo = new EventEmitter();
  @Output() removeTodo = new EventEmitter();

}
