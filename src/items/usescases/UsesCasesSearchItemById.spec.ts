import { ItemResource } from '../interfaces/gateways/ItemResource';
import { UsesCasesSearchItemById } from './UsesCasesSearchItemById';
import { mock, mockReset } from 'jest-mock-extended';
import { DescriptionItemResource } from '../interfaces/gateways/DescriptionItemResource';
import { ItemWithSoldInputModel } from '../interfaces/input-models/ItemWithSoldInputModel';
import { LoggerCustom } from '../infra/core/Logger';

describe('UsesCasesSearchItemById', () => {
  const itemResourceMock = mock<ItemResource>();
  const descriptionItemResourceMock = mock<DescriptionItemResource>();
  const loggerMock = mock<LoggerCustom>();

  const itemMock: ItemWithSoldInputModel = {
    id: '123231',
    soldQuantity: 0,
    title: 'Test',
    price: 1009,
    currencyId: 'USD',
    condition: 'new',
    picture: 'no ttiene',
    freeShipping: false,
  };

  beforeEach(async () => {
    mockReset(itemResourceMock);
    mockReset(descriptionItemResourceMock);
  });

  it('should return result item object when call getItemByI', async () => {
    itemResourceMock.getById.mockResolvedValue(itemMock);
    descriptionItemResourceMock.getDescription.mockResolvedValue('description');

    const result = await new UsesCasesSearchItemById(
      itemResourceMock,
      descriptionItemResourceMock,
      loggerMock,
    ).getItemById('id');

    expect(result).toMatchSnapshot();
  });

  it('should return result item with decimals price', async () => {
    const newItemMock: ItemWithSoldInputModel = {
      ...itemMock,
      price: 1000.11,
    };
    itemResourceMock.getById.mockResolvedValue(newItemMock);
    descriptionItemResourceMock.getDescription.mockResolvedValue('description');

    const result = await new UsesCasesSearchItemById(
      itemResourceMock,
      descriptionItemResourceMock,
      loggerMock,
    ).getItemById('id');

    expect(result.item.price.decimals).toEqual(11);
  });
});
