import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, throwError } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  userUrl: string = 'https://jsonplaceholder.typicode.com/users';

  // Retrieve the users from the API using RxJS
  private users$: Observable<User[]> = this.http.get<User[]>(this.userUrl)
    .pipe(
      catchError((error) => throwError(() => error)
      )
    );

  // Expose the state as a signal
  users: Signal<User[]> = toSignal(this.users$, { initialValue: [] as User[] });
  selectedId: WritableSignal<number> = signal(0);

  // Set the selected user
  setSelectedUser(id: number): void {
    this.selectedId.set(id);
  }
}
