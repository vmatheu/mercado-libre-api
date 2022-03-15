import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryInputModel } from '../../interfaces/input-models/QueryInputModel';
import { ItemByIdOutputModel } from '../../interfaces/output-models/ItemByIdOutputModel';
import { SearchOutputModel } from '../../interfaces/output-models/SearchOutputModel';
import { UsesCasesSearchItemById } from '../../usescases/UsesCasesSearchItemById';
import { UsesCasesSearchItemsByQuery } from '../../usescases/UsesCasesSearchItemsByQuery';

@Controller('api/items')
export class ItemController {
  constructor(
    private readonly usesCasesSearchItemsByQuery: UsesCasesSearchItemsByQuery,
    private readonly usesCasesSearchItemById: UsesCasesSearchItemById,
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
    console.log(request.q);
    const result = await this.usesCasesSearchItemsByQuery.findByQuerySearch(
      request,
    );
    return result;
  }
}