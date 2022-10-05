export interface ICubeReqest {
  feature: string;
  query: Query;
}

interface Query {
  measures: string[];
  filters: Filter[];
}

interface Filter {
  member: string;
  operator: string;
  values: string[];
}
