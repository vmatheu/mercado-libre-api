import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DescriptionItemResource } from 'src/items/interfaces/gateways/DescriptionItemResource';

@Injectable()
export class DescriptionItemResourceEndpoint
  implements DescriptionItemResource
{
  async getDescription(id: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/items/${id}/description`,
      );
      return response.data.plain_text;
    } catch (err) {
      console.error(err);
    }
  }
}
