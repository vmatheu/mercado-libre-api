import { Injectable } from '@nestjs/common';
import { getAuthor } from '../domain/author';
import { buildItemWithSoldAndDesc } from '../domain/Item';
import { LoggerCustom } from '../infra/core/Logger';
import { DescriptionItemResourceEndpoint } from '../infra/endpoints/DescriptionItemResourceEndpoint';
import { ItemResourceEndpoint } from '../infra/endpoints/ItemResourceEndpoint';
import { ItemByIdOutputModel } from '../interfaces/output-models/ItemByIdOutputModel';

@Injectable()
export class UsesCasesSearchItemById {
  constructor(
    private readonly itemResource: ItemResourceEndpoint,
    private readonly descriptionItemResource: DescriptionItemResourceEndpoint,
    private readonly logger: LoggerCustom,
  ) {
    logger.init(UsesCasesSearchItemById.name);
  }

  async getItemById(id: string): Promise<ItemByIdOutputModel> {
    this.logger.debug(`call getItemById=${id}`);
    const item = await this.itemResource.getById(id);
    const description = await this.descriptionItemResource.getDescription(id);

    this.logger.debug(`result getItemById itemI=${JSON.stringify(item)}`);
    return {
      author: getAuthor(),
      item: buildItemWithSoldAndDesc(item, description),
    };
  }
}
