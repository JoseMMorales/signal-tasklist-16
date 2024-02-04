import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/components/todo/todo.service';
import { ToDo } from '../todo';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTodosComponent {
  todoService: TodoService = inject(TodoService);

  // Expose the state as signals
  userTasks: WritableSignal<ToDo[]> = this.todoService.userTasks;
  pageTitle: Signal<string> = computed(
    () => `User Task - ${this.completedCount()} completed`,
  );

  private completedCount: Signal<number> = computed(
    () => this.userTasks().filter((task) => task.completed).length,
  );

  // Mark as completed
  markComplete(task: ToDo): void {
    this.todoService.markComplete(task);
  }
}
