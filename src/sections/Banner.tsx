import { useEffect, useRef, useState } from "react";
import { ScrapperServices } from "../services/scrapper";
import { LinkIcon, TriangleAlertIcon } from "lucide-react";
import Loader from "../components/Loader";
import { useDataContext } from "../context/dataContext";
import ProgressBar from "../components/ProgressBar";

function Banner() {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [cantOfArticles, setCantOfArticles] = useState<number | null>(null);
  const [time, setTime] = useState<number>(30000); // Estado para el tiempo en milisegundos (30 segundos por defecto)
  const SseRef = useRef<EventSource | null>(null);
  const dataContext = useDataContext();

  useEffect(() => {
    if (message.includes("Cantidad de articulos encontrados")) {
      const messageArray = message.split(":");
      if (messageArray.length > 1) {
        const cant = Number(messageArray[1].trim());
        if (!isNaN(cant)) {
          setCantOfArticles(cant);
        }
      }
    }
  }, [message]);

  if (!dataContext) {
    return <p>Loading...</p>; // Mostrar algo antes de devolver null
  }

  const { setData, setDataRef, data } = dataContext;
  const setSseRef = (Sse: EventSource) => {
    SseRef.current = Sse;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(Number(e.target.value)); // Establecer el valor en milisegundos
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlPattern = /[?&]minPrice=\d+&maxPrice=\d+/;
    if (!urlPattern.test(url)) {
      setError('La URL debe contener los parámetros "minPrice" y "maxPrice".');
      return;
    }
    if (SseRef.current != null) {
      SseRef.current.close();
    }
    setData([]);
    setError(null);

    // Iniciar el scraping pasando el tiempo en milisegundos
    ScrapperServices.startListeningForSSE(
      url,
      time,                         // El tiempo ya está en milisegundos
      setData,
      (message) => setMessage(message),
      setSseRef,
      setDataRef
    );
  };

  return (
    <section className="bg-white container text-center py-8">
      <h1 className="text-4xl font-extrabold mb-6">
        <span className="bg-gradient-to-tl from-slate-800 via-blue-600 to-slate-900 bg-clip-text text-transparent font-bold">
          MarketPlaceEpic
        </span>{" "}
        Scraper
      </h1>

      <ul className="mb-6 flex flex-col items-center gap-4 text-yellow-800">
        <li className="flex items-center gap-2 w-full max-w-[720px]">
          <TriangleAlertIcon className="inline w-6 h-6 text-yellow-600" />
          <p className="font-semibold text-left">
            La URL debe tener precios como mínimo y máximo para funcionar
          </p>
        </li>
        <li className="flex items-center gap-2 w-full max-w-[720px]">
          <TriangleAlertIcon className="inline w-6 h-6 text-yellow-600" />
          <p className="font-semibold text-left">
            Mientras más filtros le agregues en la página de marketplace, más
            precisos serán los artículos a analizar
          </p>
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="font-bold flex items-center gap-2">
          <p className="text-xl text-blue-600">URL a scrapear</p>
          <LinkIcon className="w-5 h-5 text-blue-600" />
        </div>
        <input
          className="border-2 border-black rounded-lg px-4 py-2 text-blue-600 focus:ring-2 focus:ring-blue-500 w-full max-w-[600px] transition-shadow"
          type="text"
          placeholder="https://www.facebook.com/marketplace/..."
          value={url}
          onChange={handleChange}
        />

        {/* Select de tiempo para el banner */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="timeSelect" className="text-blue-600 font-semibold">
            Seleccione el tiempo para el banner:
          </label>
          <select
            id="timeSelect"
            value={time}
            onChange={handleTimeChange}
            className="border-2 border-black rounded-lg px-4 py-2 text-blue-600 focus:ring-2 focus:ring-blue-500 w-40"
          >
            <option value={0}>0 segundos</option>
            <option value={30000}>30 segundos</option>
            <option value={60000}>1 minuto</option>
            <option value={120000}>2 minutos</option>
            <option value={180000}>3 minutos</option>
            <option value={240000}>4 minutos</option>
            <option value={300000}>5 minutos</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded-lg mt-4 hover:bg-yellow-600 hover:border-yellow-600 transition-colors duration-300"
        >
          Comenzar
        </button>
      </form>

      <div className="mt-4 items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-yellow-700">{message}</p>}
        {message === "Inicializando..." && (
          <div className="flex flex-col items-center my-4">
            <Loader />
          </div>
        )}
      </div>

      <ProgressBar maxValue={cantOfArticles} currentValue={data.length} />
    </section>
  );
}

export default Banner;
