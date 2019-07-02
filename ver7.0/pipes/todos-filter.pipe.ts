import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../types/todo-interface';
import { Tab } from '../types/tab-type';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], navState: Tab) {
    return todos.filter( todo => {
      if (navState === 'Active') { return !todo.completed; }
      if (navState === 'Completed') { return todo.completed; }
      return true;
    })
  }
}