import React, { useState, useRef } from "react";
import { type PublicationData } from "../types/publicationData";

type useFavDataState = {
  favData: PublicationData[];
  addOfFavData: (newItem: PublicationData) => void; // Añadido
  deleteOfFavData: (uuid: string) => void; // Añadido
  orderFavDataByPriceAsc: () => void; // Cambiado nombre
  orderFavDataByPriceDesc: () => void;
  favDataRef: React.MutableRefObject<PublicationData[]>;
  setFavDataRef: (newData: PublicationData) => void;
  restoreFavData: () => void; // Cambiado nombre
};

export const useFavData = (): useFavDataState => {
  const [favData, setFavData] = useState<PublicationData[]>([]);
  const favDataRef = useRef<PublicationData[]>([]);

  const setFavDataRef = (newData: PublicationData) => {
    const favDataPrevRef = favDataRef.current;
    favDataRef.current = [...favDataPrevRef, newData];
  };

  const restoreFavData = () => {
    setFavData(favDataRef.current);
  };

  const orderFavDataByPriceAsc = () => {
    const sortedData = [...favData].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
      return priceA - priceB; // Orden ascendente
    });
    setFavData(sortedData);
  };

  const orderFavDataByPriceDesc = () => {
    const sortedData = [...favData].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
      return priceB - priceA; // Orden descendente
    });
    setFavData(sortedData);
  };

  const addOfFavData = (newItem: PublicationData) => {
    console.log('llego este item',newItem)
    setFavData((prevFavData) => [...prevFavData, newItem]);
    setFavDataRef(newItem); // Guardar en referencia
    console.log(favData)
  };

  const deleteOfFavData = (uuid: string) => {
    const newFavData = favData.filter((item) => item.uuid !== uuid);
    setFavData(newFavData);
  };

  return {
    favData,
    addOfFavData,
    deleteOfFavData,
    orderFavDataByPriceAsc,
    orderFavDataByPriceDesc,
    favDataRef,
    restoreFavData,
    setFavDataRef,
  };
};
