export interface AdditionalConfigI {
  rate?: number;
  title?: string;
  language: string[];
}

export interface SearchConfigI {
  type: string;
  page: number;
  additionalConfig?: AdditionalConfigI;
  [key: string]: string|number|AdditionalConfigI|undefined;
}