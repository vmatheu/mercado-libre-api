import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ItemResource } from 'src/items/interfaces/gateways/ItemResource';
import { ItemWithSoldInputModel } from 'src/items/interfaces/input-models/ItemWithSoldInputModel';
import { buildItemFromResource } from './parsers';

@Injectable()
export class ItemResourceEndpoint implements ItemResource {
  async getById(id: string): Promise<ItemWithSoldInputModel> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/items/${id}`,
      );

      const result: any = response.data;
      return {
        ...buildItemFromResource(result),
        soldQuantity: result.sold_quantity,
      } as ItemWithSoldInputModel;
    } catch (err) {
      console.error(err);
    }
  }
}
