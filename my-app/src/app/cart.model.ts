export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  size: string;
  color: string;
  material: string;
  seller: string;
  price: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
}
