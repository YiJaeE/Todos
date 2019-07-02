import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Tab } from '../types/tab-type';

@Component({
  selector: 'app-todo-nav',
  template: `
    <ul class="nav">
      <li id="{{tab}}" *ngFor="let tab of Tabs" [ngClass]="{active: navState===tab}" (click)="activeTab.emit(tab)">{{tab}}</li>
    </ul>
  `,
  styleUrls: [
    '../todo-style.css'
  ]
})
export class TodoNavComponent {
  @Input() Tabs: Tab[];
  @Input() navState: Tab;

  @Output() activeTab = new EventEmitter();
  
}
