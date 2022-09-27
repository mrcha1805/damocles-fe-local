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
  product_id: string;
  product_name: string;
  kpi_group: Kpigroup[];
}

export interface Kpigroup {
  headerMenu: string;
  id: string;
  subFeature: SubFeature[];
}

export interface SubFeature {
  feature_id: string;
  feature_name: string;
  description: string;
  operator: string;
  type: string;
  ui: string;
  feature_order: number;
  search: string;
  item_value?: any[];
  itemList?: Tag[];
  tagSelect: any[];
  range_value?: number[];
  selected: boolean | false;
}

export interface Tag {
  name: string;
  value: string;
  selected: boolean;
}
