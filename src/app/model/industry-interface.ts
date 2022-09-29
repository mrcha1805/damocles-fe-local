export interface IIndustry {
  resultCode: string;
  resultDescription: string;
  resultData: IIndustryData[];
}

interface IIndustryData {
  industry_id: number;
  industry_name: string;
  isSelected: boolean | false;
  industry_description_th?: string;
  industry_description_en: string;
  product: Product[];
}

export interface Product {
  product_id: number;
  product_name: string;
  isSelected: boolean | false;
  product_description_th: string;
  product_description_en: string;
}
