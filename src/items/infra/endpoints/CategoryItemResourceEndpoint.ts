import { Injectable } from "@nestjs/common";
import axios from "axios";
import { CategoryItemResource } from "src/items/interfaces/gateways/CategoryItemResource ";
import { LoggerCustom } from "../core/Logger";

@Injectable()
export class CategoryItemResourceEndpoint implements CategoryItemResource {
  
  constructor(private readonly logger: LoggerCustom) {
    logger.init(CategoryItemResourceEndpoint.name)
  }
  
  async getCategories(categoryId: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/categories/${categoryId}`
      );
      return response.data.path_from_root.map((value) => value.name);
    } catch (err) {
      this.logger.error(err)
      throw err
    }
  }
}
