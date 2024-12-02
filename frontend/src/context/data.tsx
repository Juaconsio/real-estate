import React, { createContext, useState, useContext } from 'react';
import Property from '../types/property';

// Definir el tipo del array
interface ArrayContextType {
  arrayData: Property[]; // Puedes cambiar el tipo según tus necesidades
  setArrayData: React.Dispatch<React.SetStateAction<Property[]>>; // Función para actualizar el array
}

// Crear el contexto con un valor predeterminado
const ArrayContext = createContext<ArrayContextType | undefined>(undefined);

// Proveedor del contexto
interface ArrayProviderProps {
  children: React.ReactNode;
}

export const ArrayProvider: React.FC<ArrayProviderProps> = ({ children }) => {
  const [arrayData, setArrayData] = useState<Property[]>([]); // Inicializar el array como vacío

  return (
    <ArrayContext.Provider value={{ arrayData, setArrayData }}>
      {children}
    </ArrayContext.Provider>
  );
};

// Hook para usar el contexto
export const useArrayContext = (): ArrayContextType => {
  const context = useContext(ArrayContext);
  if (!context) {
    throw new Error('useArrayContext debe ser usado dentro de un ArrayProvider');
  }
  return context;
};
