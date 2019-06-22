import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TodosFilterPipe } from './todos-filter.pipe';

import { AppComponent } from './app.component';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoNavComponent } from './todo-nav/todo-nav.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosFilterPipe,
    TodoContainerComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
