import { UseCaseSearchItemsByQuery } from './UseCaseSearchItemsByQuery';
import { mock, mockReset } from 'jest-mock-extended';
import { LoggerCustom } from '../infra/core/Logger';
import { ItemInputModel } from '../interfaces/input-models/ItemInputModel';
import { ItemsResourcesEndpoint } from '../infra/endpoints/ItemsResourcesEndpoint';

describe('UseCaseSearchItemById', () => {
  const itemsResourceMock = mock<ItemsResourcesEndpoint>();
  const loggerMock = mock<LoggerCustom>();

  const itemMock: ItemInputModel = {
    id: '123231',
    title: 'Test',
    price: 1009,
    currencyId: 'USD',
    condition: 'new',
    picture: 'no ttiene',
    freeShipping: false,
    categoryId: 'category',
  };

  beforeEach(async () => {
    mockReset(itemsResourceMock);
  });

  it('should return result item object when call getItemByI', async () => {
    itemsResourceMock.findByQuerySearch.mockResolvedValue({
      items: [itemMock],
      categories: ['categoria']
    });

    const result = await new UseCaseSearchItemsByQuery(
      itemsResourceMock,
      loggerMock,
    ).findByQuerySearch({
      q: 'mi busqueda',
    });

    expect(result).toMatchSnapshot();
  });
});
