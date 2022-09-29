import { SubFeature } from './project-template-interface';

export interface ICriterion {
  resultCode: string;
  resultDescription: string;
  resultData: ICriterionData;
}

export interface ICriterionData {
  project_id: string;
  feature_group_name: string;
  feature_group_id: string;
  subFeature: SubFeature[];
}

// interface SubFeature {
//   project_feature_id: number;
//   product_feature_id: number;
//   feature_name: string;
//   description: string;
//   operator: string;
//   type: string;
//   ui: string;
//   feature_order: number;
//   item_value: string[];
//   range_value: any[];
// }
