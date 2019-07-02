import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Todo } from '../types/todo-interface';

@Component({
  selector: 'app-todo-footer',
  template: `
    <div class="footer">
      <div class="complete-all">
        <input class="custom-checkbox" type="checkbox" id="ck-complete-all" (change)="selectAll.emit(select.checked)" 
        [checked]="everySelect" #select>
        <label for="ck-complete-all">Mark all as complete</label>
      </div>
      <div class="clear-completed">
        <button class="btn" (click)="removeAll.emit()">Clear completed 
        (<span class="completed-todos">{{completeLength}}</span>)</button>
        <strong class="active-todos">{{incompleteLength}}</strong> items left
      </div>
    </div>
  `,
  styleUrls: [
    '../todo-style.css'
  ]
})
export class TodoFooterComponent {
  @Input() everySelect: HTMLInputElement;
  @Input() todos: Todo[];
  @Input() completeLength: HTMLSpanElement;
  @Input() incompleteLength: HTMLElement;

  @Output() selectAll = new EventEmitter<boolean>();
  @Output() removeAll = new EventEmitter();
}
