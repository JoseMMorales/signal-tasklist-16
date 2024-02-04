import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { ToDo } from './todo';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http: HttpClient = inject(HttpClient);
  userService: UserService = inject(UserService);
  todoUrl: string = 'https://jsonplaceholder.typicode.com/todos?userId=';

  // When the selected user changes, get the user's tasks
  userTasks: WritableSignal<ToDo[]> = signal<ToDo[]>([]);

  private userTask$: Observable<ToDo[]> = toObservable(
    this.userService.selectedId,
  ).pipe(
    switchMap((userId) =>
      this.http.get<ToDo[]>(this.todoUrl + userId).pipe(
        tap((tasks) => this.userTasks.set(tasks)),
        catchError((error) => throwError(() => error)),
      ),
    ),
  );

  readOnlyUserTasks: Signal<ToDo[]> = toSignal(this.userTask$, {
    initialValue: [] as ToDo[],
  });

  // Mark the task completed
  markComplete(task: ToDo): void {
    this.userTasks.mutate(() => (task.completed = true));
  }
}
