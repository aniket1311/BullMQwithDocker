import { IItems } from './common.js';

export class PaginationResponse {
  total: number;
  limit: number;
  page: number;
  sortBy: string;
  totalPages: number;
  items: IItems[];
  constructor(
    total: number,
    limit: number,
    page: number,
    sortBy: string,
    totalPages: number,
    items: IItems[]
  ) {
    this.total = total;
    this.limit = limit;
    this.page = page;
    this.sortBy = sortBy;
    this.totalPages = totalPages;
    this.items = items;
  }
}
