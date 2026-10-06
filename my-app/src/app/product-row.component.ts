import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';

@Component({
  selector: 'product-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between gap-4 p-4">
      <div class="flex items-center gap-4">
        <img
          [src]="product.imageUrl"
          [alt]="product.name"
          class="h-16 w-16 shrink-0 rounded-md object-cover"
        />
        <div>
          <h2 class="text-base font-semibold text-gray-900">{{ product.name }}</h2>
          <p class="text-sm text-gray-500">SKU: {{ product.sku }}</p>
          <p class="mt-1 text-xs text-blue-600">
            <span *ngFor="let department of product.department; let last = last">
              {{ department }}<span *ngIf="!last"> &gt; </span>
            </span>
          </p>
        </div>
      </div>
      <p class="text-lg font-semibold text-gray-900">{{ product.price | currency }}</p>
    </div>
  `,
})
export class ProductRowComponent {
  @Input({ required: true }) product!: Product;
}
