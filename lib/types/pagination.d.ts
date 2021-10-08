/**
 * Members included in a paged response.
 */
export interface PagedResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

/**
 * Options that can be included in requests that return a paged result.
 */
export type PageOptions = PageOptionsIncludeAll | PageOptionsPaged;

export interface PageOptionsIncludeAll {
  includeAll: boolean;
}

export interface PageOptionsPaged {
  page?: number;
  pageSize?: number;
}
