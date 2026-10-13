import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" class="flex items-center gap-2">
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor">
              <path [attr.d]="bagIcon" />
            </svg>
          </span>
          <span class="text-2xl font-bold text-blue-300">Brand</span>
        </a>
        <nav class="flex items-center gap-6">
          @for (link of links; track link.label) {
            <a href="#" class="relative flex flex-col items-center text-gray-500 hover:text-gray-800">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor">
                <path [attr.d]="link.icon" />
              </svg>
              <span class="mt-1 text-xs">{{ link.label }}</span>
              @if (link.label === 'My cart' && cart.count() > 0) {
                <span
                  class="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white"
                >
                  {{ cart.count() }}
                </span>
              }
            </a>
          }
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly cart = inject(CartService);

  readonly bagIcon =
    'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z';

  readonly links = [
    {
      label: 'Profile',
      icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    },
    {
      label: 'Message',
      icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z',
    },
    {
      label: 'Orders',
      icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    },
    {
      label: 'My cart',
      icon: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.89 2-2-.9-2-2-2z',
    },
  ];
}
