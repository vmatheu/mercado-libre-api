import { ItemsResource } from '../interfaces/gateways/ItemsResource';
import { UsesCasesSearchItemsByQuery } from './UsesCasesSearchItemsByQuery';
import { mock, mockReset } from 'jest-mock-extended';
import { LoggerCustom } from '../infra/core/Logger';
import { ItemInputModel } from '../interfaces/input-models/ItemInputModel';

describe('UsesCasesSearchItemById', () => {
  const itemsResourceMock = mock<ItemsResource>();
  const loggerMock = mock<LoggerCustom>();

  const itemMock: ItemInputModel = {
    id: '123231',
    title: 'Test',
    price: 1009,
    currencyId: 'USD',
    condition: 'new',
    picture: 'no ttiene',
    freeShipping: false,
  };

  beforeEach(async () => {
    mockReset(itemsResourceMock);
  });

  it('should return result item object when call getItemByI', async () => {
    itemsResourceMock.findByQuerySearch.mockResolvedValue({
      items: [itemMock],
      categories: ['categoria']
    });

    const result = await new UsesCasesSearchItemsByQuery(
      itemsResourceMock,
      loggerMock,
    ).findByQuerySearch({
      q: 'mi busqueda',
    });

    expect(result).toMatchSnapshot();
  });
});
