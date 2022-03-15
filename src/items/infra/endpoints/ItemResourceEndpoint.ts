import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ItemResource } from 'src/items/interfaces/gateways/ItemResource';
import { ItemWithSoldInputModel } from 'src/items/interfaces/input-models/ItemWithSoldInputModel';

@Injectable()
export class ItemResourceEndpoint implements ItemResource {
  async getById(id: string): Promise<ItemWithSoldInputModel> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/items/${id}`,
      );

      const result: any = response.data;
      return {
        id: result.id,
        title: result.title,
        price: result.price,
        currencyId: result.currency_id,
        condition: result.condition,
        picture: result.thumbnail,
        freeShipping: result.shipping.free_shipping,
        category: result.category_id,
        soldQuantity: result.sold_quantity,
      } as ItemWithSoldInputModel;
    } catch (err) {
      console.error(err);
    }
  }
}
