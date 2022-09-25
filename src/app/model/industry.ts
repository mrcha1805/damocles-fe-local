export interface IIndustry {
  resultCode: string;
  resultDescription: string;
  resultData: IIndustryData[];
}

interface IIndustryData {
  industry_id: (null | number | number)[];
  industry_name: string;
  industry_shortname: string;
  industry_description_th?: string;
  industry_description_en: string;
  product_id?: number;
  product_name?: string;
  product_shortname?: string;
  product_description_th?: string;
  product_description_en?: string;
}
