export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export type Location = {
  name: string;
  url: string;
};

export type OptionType = {
  label: string;
  value: string;
};

export enum FilterType {
  STATUS = "status",
  GENDER = "gender",
  SPECIES = "species",
  NAME = "name",
  PAGE = "page",
}

export type Mode = "light" | "dark";

export enum ThemeColor {
  TEAL = 0,
  PURPLE = 1,
  ORANGE = 2,
}
