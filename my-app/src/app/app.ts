import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';
import { ProductsListComponent } from './products-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductsListComponent],
  template: `
    <main class="min-h-screen bg-gray-50 px-4 py-10 font-sans">
      <section class="mx-auto max-w-2xl">
        <h1 class="mb-6 text-2xl font-bold text-gray-900">Inventory</h1>
        <products-list
          [productList]="products"
          (onProductSelected)="productWasSelected($event)"
        ></products-list>
      </section>
    </main>
  `,
})
export class AppComponent {
  products: Product[];
  selectedProduct?: Product;

  constructor() {
    this.products = [
      new Product(
        'NEATOJACKET',
        'Blue Jacket',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
        ['Women', 'Apparel', 'Jackets'],
        238.99,
      ),
      new Product(
        'NICEHAT',
        'A Nice Black Hat',
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=200&q=80',
        ['Men', 'Accessories', 'Hats'],
        29.99,
      ),
      new Product(
        'MYSHOES',
        'Running Shoes',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80',
        ['Men', 'Footwear', 'Running'],
        129.99,
      ),
    ];
  }

  productWasSelected(product: Product): void {
    this.selectedProduct = product;
  }
}
