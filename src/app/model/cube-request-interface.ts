export interface ICubeReqest {
  feature: string;
  query: QueryRequest;
}

export interface QueryRequest {
  measures: string[];
  filters: Filter[];
}

interface Filter {
  member: string;
  operator: string;
  values: string[];
}
