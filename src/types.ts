export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'T-Shirts' | 'Hoodies' | 'Pants' | 'Jackets' | 'Accessories' | 'Boots';
  image: string;
}

export interface LookbookItem {
  id: string;
  image: string;
  title: string;
}
