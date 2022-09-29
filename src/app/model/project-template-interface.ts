export interface IProjectTemplate {
  resultCode: string;
  resultDescription: string;
  resultData: ProjectTemplateData;
}

export interface ProjectTemplateData {
  project_id: string;
  project_name: string;
  industry_id: string;
  industry_name: string;
  industry_shortname: string;
  product_id: number;
  product_name: string;
  feature_group: Featuregroup[];
}

export interface Featuregroup {
  feature_group_name: string;
  feature_group_id: string;
  subFeature: SubFeature[];
}

export interface SubFeature {
  project_feature_id: number;
  product_feature_id: number;
  feature_name: string;
  description: string;
  operator: string;
  type: string;
  ui: string;
  search: string;
  feature_order: number;
  item_value?: any[];
  itemList?: Tag[];
  tagSelect: any[];
  range_value: number[];
  selected: boolean | false;
}

export interface Tag {
  name: string;
  value: string;
  selected: boolean;
}
