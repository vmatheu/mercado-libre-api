import { Injectable } from "@nestjs/common";
import { buildItem } from "../domain/Item";
import { LoggerCustom } from "../infra/core/Logger";
import { ItemsResourcesEndpoint } from "../infra/endpoints/ItemsResourcesEndpoint";
import { ItemInputModel } from "../interfaces/input-models/ItemInputModel";
import { QueryInputModel } from "../interfaces/input-models/QueryInputModel";
import {
  Item,
  SearchOutputModel,
} from "../interfaces/output-models/SearchOutputModel";

interface IHash {
  [details: string]: number;
}

@Injectable()
export class UsesCasesSearchItemsByQuery {
  constructor(
    private readonly itemsResource: ItemsResourcesEndpoint,
    private readonly logger: LoggerCustom
  ) {
    logger.init(UsesCasesSearchItemsByQuery.name);
  }

  async findByQuerySearch(
    request: QueryInputModel
  ): Promise<SearchOutputModel> {
    this.logger.debug(`call findByQuerySearch=${request.q}`);

    const result = await this.itemsResource.findByQuerySearch(request.q);
    const items = result.items.slice(0, 4).map((item) => buildItem(item));

    this.logger.debug(`result findByQuerySearch count=${items.length}`);
    this.logger.debug(`result findByQuerySearch categories=${result.categories}`);

    return {
      author: {
        name: "Victor",
        lastName: "Matheu",
      },
      categories: result.categories,
      items,
    };
  }
}
