import React, { createContext, useContext } from "react";
import { useData } from "../hooks/useData"; // Importa tu custom hook

/**
 * Define las keys del objeto que usará el contexto, usando el tipo de useDataState del hook
 */
type dataContextType = ReturnType<typeof useData>;

/**
 * Crea el contexto utilizando los types que va a tener
 */
export const dataContext = createContext<null | dataContextType>(null);

/** Tipas el children */
type ContextProviderProps = {
  children: React.ReactNode;
};

/**
 * Hook para usar el contexto de forma fácil
 */
export const useDataContext = () => {
  return useContext(dataContext);
};

/**
 * Context Provider que envolverá a los componentes hijos
 * Lo que se pase por value será accesible en los componentes descendientes
 */
export const ContextProvider = ({ children }: ContextProviderProps) => {
  // Usas el custom hook useData
  const dataState = useData();

  return (
    <dataContext.Provider value={dataState}>
      {children}
    </dataContext.Provider>
  );
};
