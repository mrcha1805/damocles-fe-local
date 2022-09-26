export interface IIndustry {
  resultCode: string;
  resultDescription: string;
  resultData: IIndustryData[];
}

// interface IIndustryData {
//   industry_id: (null | number | number)[];
//   industry_name: string;
//   industry_shortname: string;
//   industry_description_th?: string;
//   industry_description_en: string;
//   product_id?: number;
//   product_name?: string;
//   product_shortname?: string;
//   product_description_th?: string;
//   product_description_en?: string;
// }

interface IIndustryData {
  industry_id: string;
  industry_name: string;
  industry_descript: string;
  isSelected: boolean | false;
  product: Product[];
}

interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  isSelected: boolean | false;
}
