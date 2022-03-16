import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ItemsResource } from "src/items/interfaces/gateways/ItemsResource";
import { ItemWithCategoriesInputModel } from "src/items/interfaces/input-models/ItemsWithCategoriesInputModel ";
import { LoggerCustom } from "../core/Logger";
import { buildItemFromResource } from "./parsers";

@Injectable()
export class ItemsResourcesEndpoint implements ItemsResource {

  constructor(private readonly logger: LoggerCustom) {
    logger.init(ItemsResourcesEndpoint.name)
  }

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
      this.logger.error(err)
      throw err 
    }
  }
}

