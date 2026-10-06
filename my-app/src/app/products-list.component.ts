import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';
import { ProductRowComponent } from './product-row.component';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [CommonModule, ProductRowComponent],
  template: `
    <div class="flex flex-col gap-3">
      <product-row
        *ngFor="let product of productList"
        [product]="product"
        (click)="clicked(product)"
        [class.border-blue-500]="isSelected(product)"
        [class.border-gray-200]="!isSelected(product)"
        class="block cursor-pointer rounded-lg border-2 bg-white shadow-sm"
      ></product-row>
    </div>
  `,
})
export class ProductsListComponent {
  @Input() productList: Product[] = [];
  @Output() onProductSelected = new EventEmitter<Product>();

  private currentProduct?: Product;

  clicked(product: Product): void {
    this.currentProduct = this.isSelected(product) ? undefined : product;
    if (this.currentProduct) {
      this.onProductSelected.emit(this.currentProduct);
    }
  }

  isSelected(product: Product): boolean {
    return this.currentProduct === product;
  }
}
