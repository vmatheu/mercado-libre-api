import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DescriptionItemResource } from 'src/items/interfaces/gateways/DescriptionItemResource';
import { LoggerCustom } from '../core/Logger';

@Injectable()
export class DescriptionItemResourceEndpoint
  implements DescriptionItemResource
{
  constructor(private readonly logger: LoggerCustom) {
    logger.init(DescriptionItemResourceEndpoint.name)
  }

  async getDescription(id: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/items/${id}/description`,
      );
      return response.data.plain_text;
    } catch (err) {
      this.logger.error(err)
      throw err    
    }
  }
}
