import React, { useState, useRef } from "react";
import { type PublicationData } from "../types/publicationData";
import jsonData from '../data/articlesmock.json'
type useDataState = {
  data: PublicationData[];
  // setData: React.Dispatch<React.SetStateAction<PublicationData[]>>;
  orderDataByPriceAsc: () => void;
  orderDataByPriceDesc: () => void;
  dataRef: React.MutableRefObject<PublicationData[]>;
  setDataRef: (newData: PublicationData) => void;
  restoreData: () => void,
  setNewData:(newData : PublicationData[])=>void,
  deleteItem: (uuid: string) => void,
  setData:React.Dispatch<React.SetStateAction<PublicationData[]>>
};

export const useData = (): useDataState => {
  const [data, setData] = useState<PublicationData[]>(jsonData);
  const dataRef = useRef<PublicationData[]>(jsonData);

  const setDataRef = (newData: PublicationData) => {
    const dataPrevRef = dataRef.current;
    dataRef.current = [...dataPrevRef, newData]; 
  };
  

  const restoreData = () => {
    setData(dataRef.current);
  };
  const orderDataByPriceAsc = () => {
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
      return priceA - priceB; // Orden ascendente
    });
    setData(sortedData)
  };

  const orderDataByPriceDesc = () => {
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
      return priceB - priceA; // Orden descendente
    });
    setData(sortedData)
  };

  const setNewData=(newData:PublicationData[])=>{
    setData(newData)
  }

  const deleteItem = (uuid: string) => {
    console.log('Intentando eliminar el uuid:', uuid);
    console.log('Datos actuales:', data);
  
    // Filtrar el elemento con el uuid proporcionado
    const newData = data.filter((item) => {
      console.log('Comparando:', item.uuid, 'con', uuid);
      return item.uuid !== uuid;
    });
  
    console.log('Nuevo conjunto de datos después de eliminar:', newData);
  
    setData(newData);
  };

  return {
    data,
    setData,
    orderDataByPriceAsc,
    orderDataByPriceDesc,
    dataRef,
    restoreData,
    setDataRef,
    setNewData,
    deleteItem
  };
};
