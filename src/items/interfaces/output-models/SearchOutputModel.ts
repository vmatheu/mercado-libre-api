import { AuthorOutputModel } from './AuthorOutputModel';

export interface SearchOutputModel {
  author: AuthorOutputModel;
  items: Item[];
  categories: string[];
}

export interface Item {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  freeShipping: boolean;
}
