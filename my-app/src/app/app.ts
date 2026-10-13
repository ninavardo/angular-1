import { Component } from '@angular/core';
import { CartComponent } from './cart.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CartComponent],
  template: `
    <div class="min-h-screen bg-gray-50 font-sans">
      <app-header />
      <main>
        <app-cart />
      </main>
    </div>
  `,
})
export class AppComponent {}
