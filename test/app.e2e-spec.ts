import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { mock } from 'jest-mock-extended';
import { ItemController } from '../src/items/infra/controllers/ItemController';
import { LoggerCustom } from '../src/items/infra/core/Logger';
import { DescriptionItemResourceEndpoint } from '../src/items/infra/endpoints/DescriptionItemResourceEndpoint';
import { ItemResourceEndpoint } from '../src/items/infra/endpoints/ItemResourceEndpoint';
import { ItemsResourcesEndpoint } from '../src/items/infra/endpoints/ItemsResourcesEndpoint';
import { UseCaseSearchItemById } from '../src/items/usecases/UseCaseSearchItemById';
import { UseCaseSearchItemsByQuery } from '../src/items/usecases/UseCaseSearchItemsByQuery';
import { CategoryItemResourceEndpoint } from '../src/items/infra/endpoints/CategoryItemResourceEndpoint';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        UseCaseSearchItemById,
        UseCaseSearchItemsByQuery,
        ItemResourceEndpoint,
        DescriptionItemResourceEndpoint,
        ItemsResourcesEndpoint,
        CategoryItemResourceEndpoint,
        LoggerCustom,
      ],
    })
      .overrideProvider(UseCaseSearchItemById)
      .useValue(mock<UseCaseSearchItemById>())
      .overrideProvider(UseCaseSearchItemsByQuery)
      .useValue(mock<UseCaseSearchItemsByQuery>())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/items?q=BuscoLoQueQuiero')
      .expect(200)
  });
});
