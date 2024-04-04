
export interface Category {
  id: number;
  code: string;
  name: string;
  products: Product[];
}

export interface Product {
  code: string;
  is_active: number;
  is_valid: number;
  name: string;
  slug: string;
}
