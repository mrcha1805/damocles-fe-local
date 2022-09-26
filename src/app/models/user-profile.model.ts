export enum Bank {
  BBL = 'BBL',
  SCB = 'SCB',
  TTB = 'TTB',
  KTB = 'KTB',
  KBANK = 'KBANK',
  BAY = 'BAY',
}

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  bank: Bank;
  img: string;
  imgUrl: string;
}


export interface UserProfileData {
  resultCode: string;
  resultDescription: string;
  resultData: ResultData;
}

interface ResultData {
  email: string;
  first_name: string;
  last_name: string;
  bank_id: number;
  picture_name: string;
  bank_name: string;
  bank_short_name: Bank;
  imageUrl: string;
}