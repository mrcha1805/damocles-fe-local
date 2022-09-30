export interface IRequestProject {
  profile_id: string;
  project_name: string | undefined;
  project_description: string;
  inductry_id: string | undefined;
  product_id: string | undefined;
  feature: Feature[];
}

export interface Feature {
  product_feature_id: string;
  operator: string;
  item_value: string[];
  range_value: any[];
  graph_order: string;
  feature_order: string;
}
