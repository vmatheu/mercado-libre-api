import { AuthorOutputModel } from './AuthorOutputModel';
import { Item } from './SearchOutputModel';

export interface ItemByIdOutputModel {
  author: AuthorOutputModel;
  item: ItemWithCountAndDesc;
  categories: string[];
}

export interface ItemWithCountAndDesc extends Item {
  soldQuantity: number;
  description: string;
}
