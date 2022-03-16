import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryInputModel } from '../../interfaces/input-models/QueryInputModel';
import { ItemByIdOutputModel } from '../../interfaces/output-models/ItemByIdOutputModel';
import { SearchOutputModel } from '../../interfaces/output-models/SearchOutputModel';
import { UseCaseSearchItemById } from '../../usecases/UseCaseSearchItemById';
import { UseCaseSearchItemsByQuery } from '../../usecases/UseCaseSearchItemsByQuery';
import { HttpExceptionFilter } from './HttpExceptionFilter';

@Controller('api/items')
@UseFilters(new HttpExceptionFilter())
export class ItemController {
  constructor(
    private readonly usesCasesSearchItemsByQuery: UseCaseSearchItemsByQuery,
    private readonly usesCasesSearchItemById: UseCaseSearchItemById,
  ) {}

  @Get(':id')
  async getById(@Param() params): Promise<ItemByIdOutputModel> {
    const result = await this.usesCasesSearchItemById.getItemById(params.id);
    return result;
  }

  @Get()
  async findByQuerySearch(
    @Query() request: QueryInputModel,
  ): Promise<SearchOutputModel> {
    const result = await this.usesCasesSearchItemsByQuery.findByQuerySearch(
      request,
    );
    return result;
  }
}
