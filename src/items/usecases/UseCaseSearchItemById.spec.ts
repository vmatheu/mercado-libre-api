import { UseCaseSearchItemById } from './UseCaseSearchItemById';
import { mock, mockReset } from 'jest-mock-extended';
import { ItemWithSoldInputModel } from '../interfaces/input-models/ItemWithSoldInputModel';
import { LoggerCustom } from '../infra/core/Logger';
import { ItemResourceEndpoint } from '../infra/endpoints/ItemResourceEndpoint';
import { DescriptionItemResourceEndpoint } from '../infra/endpoints/DescriptionItemResourceEndpoint';
import { CategoryItemResourceEndpoint } from '../infra/endpoints/CategoryItemResourceEndpoint';

describe('UseCaseSearchItemById', () => {
  const itemResourceMock = mock<ItemResourceEndpoint>();
  const descriptionItemResourceMock = mock<DescriptionItemResourceEndpoint>();
  const categoryItemResourceMock = mock<CategoryItemResourceEndpoint>();

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
    categoryId: 'category'
  };

  beforeEach(async () => {
    mockReset(itemResourceMock);
    mockReset(descriptionItemResourceMock);
    mockReset(categoryItemResourceMock);
  });

  it('should return result item object when call getItemByI', async () => {
    itemResourceMock.getById.mockResolvedValue(itemMock);
    descriptionItemResourceMock.getDescription.mockResolvedValue('description');

    const result = await new UseCaseSearchItemById(
      itemResourceMock,
      descriptionItemResourceMock,
      categoryItemResourceMock,
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

    const result = await new UseCaseSearchItemById(
      itemResourceMock,
      descriptionItemResourceMock,
      categoryItemResourceMock,
      loggerMock,
    ).getItemById('id');

    expect(result.item.price.decimals).toEqual(11);
  });
});
