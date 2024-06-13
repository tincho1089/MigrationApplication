export interface ApiMigration extends newMigration {
  _id: string;
  location: Location;
}

export interface Migration extends newMigration {
  id: string;
}

export interface newMigration {
  species: string;
  lat: string;
  lng: string;
  startDate: Date; 
  description: string;
  user: string;
  state: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}