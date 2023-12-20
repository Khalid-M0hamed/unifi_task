export interface Pagination {
    pagonationOptions?: {
      limit?: number;
      offset?: number;
    };
  
    filters?: any;
    sort?: any;
  }