import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ItemResource } from 'src/items/interfaces/gateways/ItemResource';
import { ItemWithSoldInputModel } from 'src/items/interfaces/input-models/ItemWithSoldInputModel';
import { LoggerCustom } from '../core/Logger';
import { buildItemFromResource } from './parsers';

@Injectable()
export class ItemResourceEndpoint implements ItemResource {

  constructor(private readonly logger: LoggerCustom) {
    logger.init(ItemResourceEndpoint.name)
  }

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
      this.logger.error(err)
      throw err     
    }
  }
}
