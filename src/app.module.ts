import { Module } from '@nestjs/common';
import { ItemController } from './items/infra/controllers/ItemController';
import { LoggerCustom } from './items/infra/core/Logger';
import { CategoryItemResourceEndpoint } from './items/infra/endpoints/CategoryItemResourceEndpoint';
import { DescriptionItemResourceEndpoint } from './items/infra/endpoints/DescriptionItemResourceEndpoint';
import { ItemResourceEndpoint } from './items/infra/endpoints/ItemResourceEndpoint';
import { ItemsResourcesEndpoint } from './items/infra/endpoints/ItemsResourcesEndpoint';
import { UsesCasesSearchItemById } from './items/usescases/UsesCasesSearchItemById';
import { UsesCasesSearchItemsByQuery } from './items/usescases/UsesCasesSearchItemsByQuery';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [
    UsesCasesSearchItemsByQuery,
    UsesCasesSearchItemById,
    ItemResourceEndpoint,
    DescriptionItemResourceEndpoint,
    ItemsResourcesEndpoint,
    CategoryItemResourceEndpoint,
    LoggerCustom,
  ],
})
export class AppModule {}
