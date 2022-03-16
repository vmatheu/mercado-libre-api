import { ItemWithCategoriesInputModel } from '../input-models/ItemsWithCategoriesInputModel ';

export interface ItemsResource {
  findByQuerySearch: (query: string) => Promise<ItemWithCategoriesInputModel>;
}
