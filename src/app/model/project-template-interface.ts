export interface IProjectTemplate {
  resultCode: string;
  resultDescription: string;
  resultData: ProjectTemplateData;
}

interface ProjectTemplateData {
  project_id: string;
  project_name: string;
  industry_id: string;
  industry_name: string;
  industry_shortname: string;
  product_id: string;
  product_name: string;
  kpi_group: Kpigroup[];
}

interface Kpigroup {
  headerMenu: string;
  id: string;
  subFeature: SubFeature[];
}

interface SubFeature {
  feature_id: string;
  feature_name: string;
  description: string;
  operator: string;
  type: string;
  ui: string;
  feature_order: string;
  ' item_value'?: string[];
  item_value?: any[];
  range_value?: number[];
}
