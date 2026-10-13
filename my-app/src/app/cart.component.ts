import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { siAmericanexpress, siApplepay, siMastercard, siPaypal, siVisa } from 'simple-icons';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <section class="mx-auto max-w-6xl px-4 py-8">
      <h1 class="mb-6 text-2xl font-semibold text-gray-900">My cart ({{ cart.count() }})</h1>

      <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div class="flex-1 rounded-lg border border-gray-200 bg-white px-4 shadow-sm">
          @for (item of cart.items(); track item.id) {
            <article class="flex gap-4 border-b border-gray-200 py-5">
              <img
                [src]="item.imageUrl"
                [alt]="item.name"
                class="h-20 w-20 shrink-0 rounded-md border border-gray-200 object-cover"
              />
              <div class="flex-1">
                <h2 class="font-medium text-gray-900">{{ item.name }}</h2>
                <p class="mt-1 text-sm text-gray-500">
                  Size: {{ item.size }}, Color: {{ item.color }}, Material: {{ item.material }}
                </p>
                <p class="text-sm text-gray-500">Seller: {{ item.seller }}</p>
                <div class="mt-3 flex gap-2">
                  <button
                    type="button"
                    (click)="cart.remove(item.id)"
                    class="rounded-md border border-gray-200 px-3 py-1 text-sm text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    class="rounded-md border border-gray-200 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
                  >
                    Save for later
                  </button>
                </div>
              </div>
              <div class="flex flex-col items-end gap-3">
                <p class="font-semibold text-gray-900">
                  {{ item.price * item.quantity | currency }}
                </p>
                <select
                  (change)="onQuantityChange(item.id, $event)"
                  class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
                >
                  @for (q of quantities; track q) {
                    <option [value]="q" [selected]="q === item.quantity">Qty: {{ q }}</option>
                  }
                </select>
              </div>
            </article>
          } @empty {
            <p class="py-10 text-center text-gray-500">Your cart is empty.</p>
          }

          <div class="flex items-center justify-between py-5">
            <button
              type="button"
              class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to shop
            </button>
            @if (cart.count() > 0) {
              <button
                type="button"
                (click)="cart.removeAll()"
                class="rounded-md border border-gray-200 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
              >
                Remove all
              </button>
            }
          </div>
        </div>

        <aside class="flex w-full flex-col gap-4 lg:w-80">
          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p class="mb-2 text-gray-700">Have a coupon?</p>
            <div class="flex">
              <input
                #couponInput
                type="text"
                placeholder="Add coupon"
                (keyup.enter)="applyCoupon(couponInput.value)"
                class="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              <button
                type="button"
                (click)="applyCoupon(couponInput.value)"
                class="rounded-r-md border border-l-0 border-gray-300 px-4 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Apply
              </button>
            </div>
            @if (couponMessage()) {
              <p class="mt-2 text-sm" [class.text-green-600]="couponValid()" [class.text-red-500]="!couponValid()">
                {{ couponMessage() }}
              </p>
            }
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <dl class="space-y-2 text-gray-600">
              <div class="flex justify-between">
                <dt>Subtotal:</dt>
                <dd>{{ cart.subtotal() | currency }}</dd>
              </div>
              <div class="flex justify-between">
                <dt>
                  Discount:
                  @if (cart.appliedCoupon(); as coupon) {
                    <span class="text-xs">({{ coupon.code }} {{ coupon.discountPercent }}%)</span>
                  }
                </dt>
                <dd class="text-red-500">- {{ cart.discount() | currency }}</dd>
              </div>
              <div class="flex justify-between">
                <dt>Tax:</dt>
                <dd class="text-green-600">+ {{ cart.tax() | currency }}</dd>
              </div>
            </dl>
            <div class="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <span class="font-semibold text-gray-900">Total:</span>
              <span class="text-xl font-bold text-gray-900">{{ cart.total() | currency }}</span>
            </div>
            <button
              type="button"
              [disabled]="cart.count() === 0"
              class="mt-4 w-full rounded-md bg-green-500 py-3 text-lg font-medium text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout
            </button>
            <div class="mt-4 flex justify-center gap-2">
              @for (method of paymentMethods; track method.title) {
                <span
                  class="flex h-7 w-10 items-center justify-center rounded border border-gray-200 bg-white"
                  [title]="method.title"
                >
                  <svg viewBox="0 0 24 24" class="h-5 w-5" [attr.fill]="'#' + method.hex" role="img">
                    <title>{{ method.title }}</title>
                    <path [attr.d]="method.path" />
                  </svg>
                </span>
              }
            </div>
          </div>
        </aside>
      </div>
    </section>
  `,
})
export class CartComponent {
  readonly cart = inject(CartService);

  readonly quantities = Array.from({ length: 10 }, (_, i) => i + 1);
  readonly paymentMethods = [siAmericanexpress, siMastercard, siPaypal, siVisa, siApplepay];

  readonly couponMessage = signal('');
  readonly couponValid = signal(false);

  onQuantityChange(id: number, event: Event): void {
    const quantity = Number((event.target as HTMLSelectElement).value);
    this.cart.updateQuantity(id, quantity);
  }

  applyCoupon(code: string): void {
    if (!code.trim()) {
      this.cart.applyCoupon('');
      this.couponValid.set(false);
      this.couponMessage.set('Please enter a coupon code.');
      return;
    }
    const coupon = this.cart.applyCoupon(code);
    this.couponValid.set(coupon !== null);
    this.couponMessage.set(
      coupon
        ? `Coupon ${coupon.code} applied: ${coupon.discountPercent}% off.`
        : 'Invalid coupon code.',
    );
  }
}
