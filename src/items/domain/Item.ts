import { ItemInputModel } from '../interfaces/input-models/ItemInputModel';
import { ItemWithSoldInputModel } from '../interfaces/input-models/ItemWithSoldInputModel';
import { ItemWithCountAndDesc } from '../interfaces/output-models/ItemByIdOutputModel';
import { Item } from '../interfaces/output-models/SearchOutputModel';

const getDecimals = (amount: number) => {
  const twoPart = (amount + '').split('.');
  return twoPart.length > 1 ? Number.parseInt(twoPart[1]) : 0;
};

export const buildItem = (item: ItemInputModel): Item => ({
  id: item.id,
  title: item.title,
  price: {
    currency: item.currencyId,
    amount: item.price,
    decimals: getDecimals(item.price),
  },
  condition: item.condition,
  picture: item.picture,
  freeShipping: item.freeShipping,
});

export const buildItemWithSoldAndDesc = (
  item: ItemWithSoldInputModel,
  description: string,
): ItemWithCountAndDesc => ({
  ...buildItem(item),
  soldQuantity: item.soldQuantity,
  description,
});
