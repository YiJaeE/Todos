import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  template: `
    <input class="input-todo" placeholder="What needs to be done?" autofocus (keyup.enter)="addTodo.emit($event.target)">
  `,
  styleUrls: [
    '../todo-style.css'
  ],
})
export class TodoFormComponent {

  @Output() addTodo = new EventEmitter();

}
