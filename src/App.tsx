import React, { useState } from "react";
import { ScrapperServices } from "./services/scrapper";
import { type PublicationData } from "./types/publicationData";
import TableGeneral from "./components/TableGeneral";

function App() {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PublicationData[]>([]);
  const [message, setMessage] = useState<string>("");

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

    setError(null);
    ScrapperServices.startListeningForSSE(
      url,
      setData,
      (message) => setMessage(message)  // Manejar el mensaje de cantidad de artículos
    );
  };

  return (
    <main className="bg-blue-950 min-h-screen flex-col flex items-center">
      <div className="bg-white container text-center py-4">
        <h1 className="text-4xl font-bold">MarketPlace Epic Scraper</h1>
        <p>La URL debe tener precios como mínimo y máximo para funcionar</p>
        <div className="py-4 text-2xl text-center">
          <form onSubmit={handleSubmit}>
            <label>
              URL a scrapear:
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
              className="bg-blue-600 text-white p-2 rounded-lg mt-4"
            >
              Enviar
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {message && <p className="text-yellow-500 mt-2">{message}</p>}  {/* Mostrar el mensaje de cantidad */}
        </div>
      </div>
      <section className="container bg-red-700">
        <TableGeneral>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">No data available</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Ver enlace</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={item.image} alt={item.title} className="h-16 w-16 object-cover"/>
                </td>
              </tr>
            ))
          )}
        </TableGeneral>
      </section>
    </main>
  );
}

export default App;
