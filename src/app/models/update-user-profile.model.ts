import { Bank } from "./user-profile.model";

export interface UpdateUserProfile {
  resultCode: string;
  resultDescription: string;
  resultData: ResultData;
}

interface ResultData {
  email: string;
  first_name: string;
  last_name: string;
  bank_id: string;
  picture_name: string;
  bank_name: string;
  bank_short_name: Bank;
  imageUrl: string;
}