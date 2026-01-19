export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  shopifyId?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Collection {
  id: number;
  title: string;
  image: string;
  description: string;
}