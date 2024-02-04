import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserListComponent } from '../components/user/user-list/user-list.component';
import { UserTodosComponent } from '../components/todo/user-todos/user-todos.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <div class="col-md-4">
        <app-user-list></app-user-list>
      </div>
      <div class="col-md-8">
        <app-user-todos></app-user-todos>
      </div>
    </div>
  `,
  imports: [UserListComponent, UserTodosComponent],
})
export class UserPageComponent {}
