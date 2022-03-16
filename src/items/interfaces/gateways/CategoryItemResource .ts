export interface CategoryItemResource {
  getCategories: (categoryId: string) => Promise<string[]>;
}
