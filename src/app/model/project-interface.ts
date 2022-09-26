// export interface IProject {
//   name: string;
//   description: string;
//   created: string;
//   industry: string;
//   product: string;
//   timeFormat: string | undefined;
//   timeLabel: string | undefined;
// }
export interface IProject {
  project_id: number;
  project_name: string;
  project_description: string;
  created_at: string;
  timeFormat: string | undefined;
  timeLabel: string | undefined;
  updated_at: string;
  product_name: string;
  industry_name: string;
}

export interface IProjectModel {
  resultCode: string;
  resultDescription: string;
  resultData: ProjectData;
}
interface ProjectData {
  profile_id: string;
  project: ProjectItem[];
}

interface ProjectItem {
  project_id: number;
  project_name: string;
  project_description: string;
  created_at: string;
  timeFormat: string | undefined;
  timeLabel: string | undefined;
  updated_at: string;
  product_name: string;
  industry_name: string;
}
