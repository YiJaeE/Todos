import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  template: `
    <input class="input-todo" placeholder="What needs to be done?" autofocus [(ngModel)]="content" (keyup.enter)="addTodo()">
  `,
  styleUrls: [
    '../todo-style.css'
  ],
})
export class TodoFormComponent {
  content: string;
  @Output() add = new EventEmitter<string>();

  addTodo() {
    const content = this.content && this.content.trim();
    this.content = '';

    if (!content) { return; }
    this.add.emit(content);
  }

}
