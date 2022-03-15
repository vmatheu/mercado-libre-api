import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ItemsResource } from 'src/items/interfaces/gateways/ItemsResource';
import { ItemInputModel } from 'src/items/interfaces/input-models/ItemInputModel';

@Injectable()
export class ItemsResourcesEndpoint implements ItemsResource {
  async findByQuerySearch(query: string): Promise<ItemInputModel[]> {
    try {
      const response = await axios.get(
        'https://api.mercadolibre.com/sites/MLA/search?q=',
        {
          params: {
            q: query,
          },
        },
      );

      const results: Array<any> = response.data.results;
      return results.map(
        (result) =>
          ({
            id: result.id,
            title: result.title,
            price: result.price,
            currencyId: result.currency_id,
            condition: result.condition,
            picture: result.thumbnail,
            freeShipping: result.shipping.free_shipping,
            category: result.category_id,
          } as ItemInputModel),
      );
    } catch (err) {
      console.error(err);
    }
  }
}
