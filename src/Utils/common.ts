export interface IItems {
  id?: string;
  gender: string;
  name: string;
  address: IAddress;
  email: string;
  age: number;
  picture: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAddress {
  city: string;
  state: string;
  country: string;
  street: string;
}
