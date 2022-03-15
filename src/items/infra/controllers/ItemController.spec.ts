import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { UsesCasesSearchItemById } from '../../usescases/UsesCasesSearchItemById';
import { UsesCasesSearchItemsByQuery } from '../../usescases/UsesCasesSearchItemsByQuery';
import { LoggerCustom } from '../core/Logger';
import { DescriptionItemResourceEndpoint } from '../endpoints/DescriptionItemResourceEndpoint';
import { ItemResourceEndpoint } from '../endpoints/ItemResourceEndpoint';
import { ItemsResourcesEndpoint } from '../endpoints/ItemsResourcesEndpoint';
import { ItemController } from './ItemController';

describe('AppController', () => {
  let appController: ItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        UsesCasesSearchItemById,
        UsesCasesSearchItemsByQuery,
        ItemResourceEndpoint,
        DescriptionItemResourceEndpoint,
        ItemsResourcesEndpoint,
        LoggerCustom,
      ],
    })
      .overrideProvider(UsesCasesSearchItemById)
      .useValue(mock<UsesCasesSearchItemById>())
      .overrideProvider(UsesCasesSearchItemsByQuery)
      .useValue(mock<UsesCasesSearchItemsByQuery>())
      .compile();

    appController = app.get<ItemController>(ItemController);
  });

  describe('root', () => {
    it('should return with out error"', async () => {
      const result = await appController.getById('test');
      expect(result).not.toBeNull();
    });
  });
});
