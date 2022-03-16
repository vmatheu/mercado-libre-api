import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CategoryItemResource } from 'src/items/interfaces/gateways/CategoryItemResource ';

@Injectable()
export class CategoryItemResourceEndpoint implements CategoryItemResource
{
  async getCategories(categoryId: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/categories/${categoryId}`,
      );
      return response.data.path_from_root.map(value => value.name);
    } catch (err) {
      console.error(err);
    }
  }
}
