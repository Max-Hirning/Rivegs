export interface LanguageI {
  code: string;
  flag: string;
  label: string;
}

export interface AppStoreI {
  menuStatus: boolean;
  languages: LanguageI[];
  searchModalStatus: boolean;
  recipeLanguageStatus: boolean;
  changeRateModalStatus: boolean;
}