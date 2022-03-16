import { Injectable } from '@nestjs/common';
import { getAuthor } from '../domain/author';
import { buildItemWithSoldAndDesc } from '../domain/Item';
import { LoggerCustom } from '../infra/core/Logger';
import { CategoryItemResourceEndpoint } from '../infra/endpoints/CategoryItemResourceEndpoint';
import { DescriptionItemResourceEndpoint } from '../infra/endpoints/DescriptionItemResourceEndpoint';
import { ItemResourceEndpoint } from '../infra/endpoints/ItemResourceEndpoint';
import { ItemByIdOutputModel } from '../interfaces/output-models/ItemByIdOutputModel';

@Injectable()
export class UseCaseSearchItemById {
  constructor(
    private readonly itemResource: ItemResourceEndpoint,
    private readonly descriptionItemResource: DescriptionItemResourceEndpoint,
    private readonly categoryItemResources: CategoryItemResourceEndpoint,
    private readonly logger: LoggerCustom,
  ) {
    logger.init(UseCaseSearchItemById.name);
  }

  async getItemById(id: string): Promise<ItemByIdOutputModel> {
    this.logger.debug(`call getItemById=${id}`);
   
    const item = await this.itemResource.getById(id);

    this.logger.debug(`result getItemById itemI=${JSON.stringify(item)}`);

    const description = this.descriptionItemResource.getDescription(id);
    const categories = this.categoryItemResources.getCategories(item.categoryId)

    return Promise.all([description, categories]).then( values => {
      return {
        author: getAuthor(),
        item: buildItemWithSoldAndDesc(item, values[0]),
        categories: values[1]
      }; 
    })
  }
}
