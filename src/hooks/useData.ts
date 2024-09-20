import React, { useState, useRef } from "react";
import { type PublicationData } from "../types/publicationData";

type useDataState = {
  data: PublicationData[];
  // setData: React.Dispatch<React.SetStateAction<PublicationData[]>>;
  orderDataByPriceAsc: () => void;
  orderDataByPriceDesc: () => void;
  dataRef: React.MutableRefObject<PublicationData[]>;
  setDataRef: (newRef: PublicationData[]) => void;
  restoreData: () => void,
  setNewData:(newData : PublicationData[])=>void
};

export const useData = (): useDataState => {
  const [data, setData] = useState<PublicationData[]>([]);
  const dataRef = useRef<PublicationData[]>([]);

  const setDataRef = (newRef: PublicationData[]) => {
    dataRef.current = newRef; // Asignar directamente el nuevo valor a current
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

  return {
    data,
    orderDataByPriceAsc,
    orderDataByPriceDesc,
    dataRef,
    restoreData,
    setDataRef,
    setNewData
  };
};
