export interface Brewery {
  id: number;
  obdId: string;
  name: string;
  breweryType: string;
  street: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  state: string;
  countyProvince: string | null;
  postalCode: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  websiteUrl: string | null;
  updatedAt: string;
  createdAt: string;
  region: string;
}
