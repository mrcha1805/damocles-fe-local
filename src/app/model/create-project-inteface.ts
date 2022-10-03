export interface IRequestProject {
  profile_id: string;
  project_name: string | undefined;
  project_description: string;
  inductry_id: number;
  product_id: number;
  feature: Feature[];
}

export interface Feature {
  product_feature_id: number;
  operator: string;
  item_value: string[];
  range_value: any[];
  graph_order: number;
  feature_order: number;
}
