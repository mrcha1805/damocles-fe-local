export interface ISaveProject {
  resultCode: string;
  resultDescription: string;
  resultData: SaveProjectData[];
}

interface SaveProjectData {
  profile_id: string;
  project_name: string;
  project_description: string;
  create_date: string;
  update_date: string;
  inductry_id: number;
  product_id: number;
  feature: Feature[];
}

interface Feature {
  product_feature_id: number;
  operator: string;
  item_value: string[];
  reange_value: any[];
  graph_order: number;
  feature_order: number;
}