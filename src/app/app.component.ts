import { Component } from '@angular/core';
import { UserPageComponent } from './page/user-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserPageComponent],
  template: `
    <div class="container">
      <app-user-page />
    </div>
  `,
})
export class AppComponent {}
