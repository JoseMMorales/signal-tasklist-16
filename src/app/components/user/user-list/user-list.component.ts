import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  pageTitle: string = 'User List';
  userService: UserService = inject(UserService);

  // Expose the state as signals
  users: Signal<User[]> = this.userService.users;
  selectedUserId: WritableSignal<number> = this.userService.selectedId;

  // Set the selected user
  onSelected(id: number): void {
    this.userService.setSelectedUser(id);
  }
}
