import { ItemWithSoldInputModel } from '../input-models/ItemWithSoldInputModel';

export interface ItemResource {
  getById: (id: string) => Promise<ItemWithSoldInputModel>;
}
