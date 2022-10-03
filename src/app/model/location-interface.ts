export interface ILocation {
  resultCode: string;
  resultDescription: string;
  resultData: ILocationData[];
}

export interface ILocationData {
  province_id: number;
  province_name?: string;
  district: IDistrict[];
  province_id_name?: string;
}

export interface IDistrict {
  district_id: number;
  district_name: string;
  selected?: boolean;
}

export interface ILocationDataSelected {
  province_id: number;
  province_name?: string;
  district: IDistrict[];
  province_id_name?: string;
  province_tag?: string;
}
