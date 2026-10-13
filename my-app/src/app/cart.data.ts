import { CartItem, Coupon } from './cart.model';

export const TAX_RATE = 0.01;

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'T-shirts with multiple colors, for men and lady',
    imageUrl:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Artel Market',
    price: 78.99,
    quantity: 9,
  },
  {
    id: 2,
    name: 'Blue travel backpack with laptop pocket',
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80',
    size: 'medium',
    color: 'blue',
    material: 'Polyester',
    seller: 'Best factory LLC',
    price: 39,
    quantity: 3,
  },
  {
    id: 3,
    name: 'Ceramic table lamp with linen shade',
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80',
    size: 'medium',
    color: 'grey',
    material: 'Ceramic',
    seller: 'Artel Market',
    price: 170.5,
    quantity: 1,
  },
];

export const COUPONS: Coupon[] = [
  { code: 'SAVE10', discountPercent: 10 },
  { code: 'SAVE20', discountPercent: 20 },
  { code: 'WELCOME5', discountPercent: 5 },
  { code: 'HALFOFF', discountPercent: 50 },
];
