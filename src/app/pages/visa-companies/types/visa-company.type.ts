//TODO: Revisit this type later to check if this belongs in shared or paged folder
export type VisaCompany = {
  id: string;
  name: string;
  locations: string[];
  careersUrl: string;
  logo?: string;
  industries: string[];
}
