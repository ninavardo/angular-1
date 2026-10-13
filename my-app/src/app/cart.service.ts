import { Injectable, computed, signal } from '@angular/core';
import { CART_ITEMS, COUPONS, TAX_RATE } from './cart.data';
import { CartItem, Coupon } from './cart.model';

const roundToCents = (value: number) => Math.round(value * 100) / 100;

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(CART_ITEMS.map((item) => ({ ...item })));
  readonly appliedCoupon = signal<Coupon | null>(null);

  readonly count = computed(() => this.items().length);
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  readonly tax = computed(() => roundToCents(this.subtotal() * TAX_RATE));
  readonly discount = computed(() => {
    const coupon = this.appliedCoupon();
    return coupon
      ? roundToCents(((this.subtotal() + this.tax()) * coupon.discountPercent) / 100)
      : 0;
  });
  readonly total = computed(() => this.subtotal() + this.tax() - this.discount());

  updateQuantity(id: number, quantity: number): void {
    this.items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  remove(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }

  removeAll(): void {
    this.items.set([]);
  }

  applyCoupon(code: string): Coupon | null {
    const coupon = COUPONS.find((c) => c.code === code.trim().toUpperCase()) ?? null;
    this.appliedCoupon.set(coupon);
    return coupon;
  }
}
