import React, { useEffect, useRef, useState } from "react";
import { ScrapperServices } from "./services/scrapper";
import { type PublicationData } from "./types/publicationData";
import TableGeneral from "./components/TableGeneral";
import { LinkIcon, TriangleAlertIcon } from "lucide-react";
import Loader from "./components/Loader";
import TableData from "./components/TableData";

function App() {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PublicationData[]>([]);
  const [message, setMessage] = useState<string>("");
  const [cantOfArticles,setCantOfArticles] = useState<number|null>(null)
  const SseRef = useRef<EventSource | null>(null)

  const setSseRef= (Sse:EventSource)=>{
    SseRef.current =Sse
  }
  useEffect(()=>{
    console.log(data)
  },[data])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlPattern = /[?&]minPrice=\d+&maxPrice=\d+/;
    if (!urlPattern.test(url)) {
      setError('La URL debe contener los parámetros "minPrice" y "maxPrice".');
      return;
    }
    if(SseRef.current != null){
      SseRef.current.close()
    }
    setData([])
    setError(null);
    ScrapperServices.startListeningForSSE(
      url,
      setData,
      (message) => setMessage(message) ,
      setSseRef
    );
  };

  useEffect(() => {
    console.log(message);
  
    if (message.includes('Cantidad de articulos encontrados')) {
      const messageArray = message.split(':');
      if (messageArray.length > 1) {
        const cant = Number(messageArray[1].trim());
        if (!isNaN(cant)) {
          setCantOfArticles(cant);
        }
      }
    }
  
    console.log(cantOfArticles);
  }, [message]);
  

  return (
    <main className="bg-blue-950 min-h-screen flex-col flex items-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-400 via-gray-600 to-blue-800">
      <section className="bg-white container text-center py-4">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-tl from-slate-800 via-blue-600 to-slate-900 bg-clip-text text-transparent font-bold">
            MarketPlaceEpic
          </span>
          Scraper
        </h1>
        <ul className="my-4  p-2 flex flex-col items-center gap-4  text-yellow-800">
          <li>
            <div className=" flex flex-row w-[720px] text-left">
              <span className="inline mx-2 font-bold items-center ">
                <TriangleAlertIcon className="inline" />
              </span>
              <p className="font-bold inline">
                La URL debe tener precios como mínimo y máximo para funcionar
              </p>
            </div>
          </li>
          <li>
            <div className=" flex flex-row w-[720px] items-center">
              <span className="inline mx-2">
                <TriangleAlertIcon className="inline " />
              </span>
              <p className="font-bold inline text-left">
                Mientras mas filtros le agregues en la pagina de marketplace
                antes de pegar el enlace mas preciso sera con los artículos a
                analizar
              </p>
            </div>
          </li>
        </ul>
        <div className="py-4 text-2xl text-center items-center justify-center flex flex-col">
          <form onSubmit={handleSubmit}>
            <label>
              <div className="font-bold flex items-center justify-center ">
                <p><span className="font-bold text-blue-600">URL </span> a scrapear</p>
                <span className="mx-2">
                  <LinkIcon className="w-4 h-4" />
                </span>
              </div>
              <input
                className="border-2 mx-2 rounded-lg border-black p-2 text-blue-600"
                type="text"
                placeholder="https://www.facebook.com/marketplace/106423786059675/search?minPrice=2&maxPrice=22&query=gol%20country&exact=false"
                value={url}
                onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              className="bg-blue-700 text-white border-2 p-2 rounded-lg mt-4 hover:border-yellow-600 hover:bg-yellow-600 transition-colors duration-300"
            >
              Comenzar
            </button>
          </form>
          <div className="my-4 flex-col items-center justify-center ">

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {message && <p className="text-yellow-700 mt-2 text-center">{message}</p>}
          {message === 'Inicializando...' && <div className="flex items-center justify-center"><Loader/></div>}

          </div>
          {/* Mostrar el mensaje de cantidad */}
        </div>
      </section>
      <section className="container">
        <TableGeneral>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item) => (
             <TableData {...item}/>
            ))
          )}
        </TableGeneral>
      </section>
    </main>
  );
}

export default App;
