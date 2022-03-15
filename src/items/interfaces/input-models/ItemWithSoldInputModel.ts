import { ItemInputModel } from './ItemInputModel';

export interface ItemWithSoldInputModel extends ItemInputModel {
  soldQuantity: number;
}
