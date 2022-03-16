import { Injectable } from '@nestjs/common';
import { buildItem } from '../domain/Item';
import { LoggerCustom } from '../infra/core/Logger';
import { ItemsResourcesEndpoint } from '../infra/endpoints/ItemsResourcesEndpoint';
import { ItemInputModel } from '../interfaces/input-models/ItemInputModel';
import { QueryInputModel } from '../interfaces/input-models/QueryInputModel';
import {
  Item,
  SearchOutputModel,
} from '../interfaces/output-models/SearchOutputModel';

interface IHash {
  [details: string]: number;
}

@Injectable()
export class UsesCasesSearchItemsByQuery {
  constructor(
    private readonly itemsResource: ItemsResourcesEndpoint,
    private readonly logger: LoggerCustom,
  ) {
    logger.init(UsesCasesSearchItemsByQuery.name);
  }

  async findByQuerySearch(
    request: QueryInputModel,
  ): Promise<SearchOutputModel> {
    this.logger.debug(`call findByQuerySearch=${request.q}`);

    const result = await this.itemsResource.findByQuerySearch(request.q);
    const categoryMap: IHash = {};
    const items = result.slice(0,4).map(transformInputSearchToItems(categoryMap));
    const categories = Object.keys(categoryMap).map((key) => key);

    this.logger.debug(`result findByQuerySearch count=${items.length}`);

    return {
      author: {
        name: 'Victor',
        lastName: 'Matheu',
      },
      categories,
      items,
    };
  }
}

function transformInputSearchToItems(
  categoryMap: IHash,
): (value: ItemInputModel, index: number, array: ItemInputModel[]) => Item {
  return (item) => {
    categoryMap[item.category] = 1;
    return buildItem(item);
  };
}
