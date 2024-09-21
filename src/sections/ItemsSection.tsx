import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, FilterXIcon } from 'lucide-react'
import TableGeneral from '../components/TableGeneral'
import TableData from '../components/TableData'
import { useDataContext } from '../context/dataContext'
function ItemsSection() {
    const { data, restoreData, orderDataByPriceAsc, orderDataByPriceDesc } = useDataContext();
    
    return (
      <main className="container border-2 border-black my-4 bg-white">
        <section className="bg-white/80 flex flex-col sm:flex-row items-center gap-4 px-4 py-2">
          <p className="font-semibold">Ordenar por precio:</p>
          <div className="flex gap-4">
            <button 
              className="hover:bg-yellow-500 p-2 rounded-lg flex items-center justify-center gap-1" 
              aria-label="Ordenar ascendentemente"
              onClick={orderDataByPriceAsc}
            >
              Asc.
              <ArrowUpNarrowWideIcon />
            </button>
            <button 
              className="hover:bg-yellow-500 p-2 rounded-lg flex items-center justify-center gap-1" 
              aria-label="Ordenar descendentemente"
              onClick={orderDataByPriceDesc}
            >
              Desc.
              <ArrowDownNarrowWideIcon />
            </button>
            <button 
              className="hover:bg-red-500 p-2 rounded-lg flex items-center justify-center gap-1" 
              aria-label="Restaurar filtro"
              onClick={restoreData}
            >
              <FilterXIcon />
            </button>
          </div>
        </section>
  
        <section className="mt-4">
          <TableGeneral>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <div className="text-gray-500">No data available</div>
                </td>
              </tr>
            ) : (
              data.map((item) => <TableData key={item.uuid} {...item} />)
            )}
          </TableGeneral>
        </section>
      </main>
    );
  }
  
  export default ItemsSection;
  