import { useDataContext } from "../context/dataContext";
import TableGeneral from "../components/TableGeneral";
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, FilterXIcon } from "lucide-react";
import FavTableData from "../components/FavTableData";

export default function FavoritesSection() {
  const { favData, restoreFavData, orderFavDataByPriceAsc, orderFavDataByPriceDesc } = useDataContext();

  if (favData.length === 0) {
    return (
      <section className="container bg-white flex-col items-center justify-center py-10">
        <p className="text-center text-yellow-900 font-bold text-lg">Sin artículos favoritos</p>
      </section>
    );
  }

  return (
    <main className="container border-2 border-yellow-700 bg-white">
      <p className="gap-4 px-4 py-2 text-yellow-600 text-2xl font-bold">Favoritos</p>
      <section className="bg-white/80 flex flex-col sm:flex-row items-center gap-4 px-4 py-2">
        <p className="font-semibold">Ordenar por precio:</p>
        <div className="flex gap-4">
          <button 
            className="hover:bg-yellow-500 p-2 rounded-lg flex items-center justify-center gap-1" 
            aria-label="Ordenar ascendentemente"
            onClick={orderFavDataByPriceAsc}
          >
            Asc.
            <ArrowUpNarrowWideIcon />
          </button>
          <button 
            className="hover:bg-yellow-500 p-2 rounded-lg flex items-center justify-center gap-1" 
            aria-label="Ordenar descendentemente"
            onClick={orderFavDataByPriceDesc}
          >
            Desc.
            <ArrowDownNarrowWideIcon />
          </button>
          <button 
            className="hover:bg-red-500 p-2 rounded-lg flex items-center justify-center gap-1" 
            aria-label="Restaurar filtro"
            onClick={restoreFavData}
          >
            <FilterXIcon />
          </button>
        </div>
      </section>

      <section className="mt-4">
        <TableGeneral>
          {favData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <div className="text-gray-500">No data available</div>
              </td>
            </tr>
          ) : (
            favData.map((item) => <FavTableData key={item.uuid} {...item} />)
          )}
        </TableGeneral>
      </section>
    </main>
  );
}
