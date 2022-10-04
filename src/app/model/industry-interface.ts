export interface IIndustry {
  resultCode: string;
  resultDescription: string;
  resultData: IIndustryData[];
}

interface IIndustryData {
  industry_id: number;
  industry_name: string;
  isSelected: boolean | false;
  industry_description: string;
  product: Product[];
}

export interface Product {
  product_id: number;
  product_name: string;
  isSelected: boolean | false;
  product_description: string;
  cube_name: string;
}
