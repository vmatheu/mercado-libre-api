export interface DescriptionItemResource {
  getDescription: (id: string) => Promise<string>;
}
