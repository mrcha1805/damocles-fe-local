export interface IFilterLocation {
  resultCode: string;
  resultDescription: string;
  resultData: FilterLocationData[];
}

export interface FilterLocationData {
  province_id: number;
  province_name?: string;
  district: District[];
  province_id_name?: string;
}

interface District {
  district_id: number;
  district_name: string;
}