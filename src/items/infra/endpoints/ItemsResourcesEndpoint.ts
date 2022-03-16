import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ItemsResource } from "src/items/interfaces/gateways/ItemsResource";
import { ItemInputModel } from "src/items/interfaces/input-models/ItemInputModel";
import { ItemWithCategoriesInputModel } from "src/items/interfaces/input-models/ItemsWithCategoriesInputModel ";
import { buildItemFromResource } from "./parsers";

@Injectable()
export class ItemsResourcesEndpoint implements ItemsResource {
  async findByQuerySearch(
    query: string
  ): Promise<ItemWithCategoriesInputModel> {
    try {
      const response = await axios.get(
        "https://api.mercadolibre.com/sites/MLA/search?q=",
        {
          params: {
            q: query,
          },
        }
      );

      const results: Array<any> = response.data.results;
      return {
        items: results.map((result) => buildItemFromResource(result)),
        categories: response.data.filters.length > 0 ?
          response.data.filters[0].values[0].path_from_root.map(category => category.name): []
      };
    } catch (err) {
      console.error(err);
    }
  }
}

