import React, { createContext, useContext } from "react";
import { useData } from "../hooks/useData"; // Importa tu custom hook
import { useFavData } from "../hooks/useFavData";

// Define las keys del objeto que usará el contexto, usando el tipo de useDataState del hook
type dataContextType = ReturnType<typeof useData>;
type favDataContextType = ReturnType<typeof useFavData>;

type DatasContextType = dataContextType & favDataContextType;

// Crea el contexto utilizando los types que va a tener
export const dataYFavContext = createContext<DatasContextType | null>(null);

/** Tipas el children */
type ContextProviderProps = {
  children: React.ReactNode;
};

/**
 * Hook para usar el contexto de forma fácil
 */
export const useDataContext = () => {
  const context = useContext(dataYFavContext);
  if (!context) {
    throw new Error("useDataContext debe ser usado dentro de un ContextProvider");
  }
  return context;
};

/**
 * Context Provider que envolverá a los componentes hijos
 * Lo que se pase por value será accesible en los componentes descendientes
 */
export const ContextProvider = ({ children }: ContextProviderProps) => {
  // Usas el custom hook useData
  const dataState = useData();
  const favDataState = useFavData();
  
  const value = {
    ...dataState,
    ...favDataState,
  };

  return (
    <dataYFavContext.Provider value={value}>
      {children}
    </dataYFavContext.Provider>
  );
};
