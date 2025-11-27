export type ViewState = 'landing' | 'collection' | 'product' | 'auth' | 'cart' | 'about' | 'dashboard';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: string[];
  sizes: string[];
  images: string[];
  inStock: boolean;
  category: 'tshirt' | 'hoodie' | 'accessory' | 'pull';
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
