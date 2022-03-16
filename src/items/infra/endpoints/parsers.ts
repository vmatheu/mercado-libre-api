import { ItemInputModel } from "src/items/interfaces/input-models/ItemInputModel";

export const buildItemFromResource = (result): ItemInputModel => ({
    id: result.id,
    title: result.title,
    price: result.price,
    currencyId: result.currency_id,
    condition: result.condition,
    picture: result.thumbnail,
    freeShipping: result.shipping.free_shipping,
    categoryId: result.category_id
  });
  