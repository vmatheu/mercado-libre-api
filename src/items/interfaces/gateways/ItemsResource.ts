import { ItemInputModel } from '../input-models/ItemInputModel';

export interface ItemsResource {
  findByQuerySearch: (query: string) => Promise<ItemInputModel[]>;
}
