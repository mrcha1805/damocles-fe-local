export interface IGetprojectID {
  resultCode: string;
  resultDescription: string;
  resultData: GetprojectIDData;
}

export interface GetprojectIDData {
  project_id: string;
  project_name: string;
}