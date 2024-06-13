import React, { createContext, useContext, useState } from 'react';

interface FilterContextProps {
  stateFilter: string;
  setStateFilter: (stateFilter: string) => void;
  distance: number;
  setDistance: (distance: number) => void;
  myMigrations: boolean;
  setMyMigrations: (myMigrations: boolean) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stateFilter, setStateFilter] = useState<string>('Active');
  const [distance, setDistance] = useState<number>(100); // Default distance set to 100 km
  const [myMigrations, setMyMigrations] = useState<boolean>(false);

  return (
    <FilterContext.Provider value={{ stateFilter, setStateFilter, distance, setDistance, myMigrations, setMyMigrations }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
