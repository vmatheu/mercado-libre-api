import { Module } from '@nestjs/common';
import { ItemController } from './items/infra/controllers/ItemController';
import { LoggerCustom } from './items/infra/core/Logger';
import { CategoryItemResourceEndpoint } from './items/infra/endpoints/CategoryItemResourceEndpoint';
import { DescriptionItemResourceEndpoint } from './items/infra/endpoints/DescriptionItemResourceEndpoint';
import { ItemResourceEndpoint } from './items/infra/endpoints/ItemResourceEndpoint';
import { ItemsResourcesEndpoint } from './items/infra/endpoints/ItemsResourcesEndpoint';
import { UseCaseSearchItemById } from './items/usecases/UseCaseSearchItemById';
import { UseCaseSearchItemsByQuery } from './items/usecases/UseCaseSearchItemsByQuery';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [
    UseCaseSearchItemsByQuery,
    UseCaseSearchItemById,
    ItemResourceEndpoint,
    DescriptionItemResourceEndpoint,
    ItemsResourcesEndpoint,
    CategoryItemResourceEndpoint,
    LoggerCustom,
  ],
})
export class AppModule {}
