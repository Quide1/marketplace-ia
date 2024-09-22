import { useDataContext } from "../context/dataContext";
import { PublicationData } from "../types/publicationData";

const cleanDescription = (desc: string) => {
  return desc.replace(/Ver menos/g, "");
};

import { StarIcon } from "lucide-react";
function FavTableData({
  image,
  price,
  link,
  title,
  description,
  uuid,
}: PublicationData) {
  const dataContext = useDataContext();

  if (!dataContext) return null; // Manejar si no hay contexto (en casos donde el componente no esté envuelto en el provider)

  const { deleteOfFavData,changeFavToFalse } = dataContext;

  const handleDeleteFavItem = () => {
    deleteOfFavData(uuid);
    changeFavToFalse(uuid)
  };
  return (
    <tr className="">
      <td className="text-sm text-gray-500 w-[150px]">
        <img
          src={image}
          alt="Car Image"
          className="w-32 h-32 object-cover rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex flex-col gap-2">
          <p>{price}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-bold"
          >
            Enlace
          </a>
        </div>
      </td>
      <td className="px-6 py-4  text-sm font-medium text-gray-900 max-w-[250px]">
        {title}
      </td>
      <td className="px-6 py-4  text-sm text-gray-500">
        {cleanDescription(description)}
      </td>
      <td>
        <div className="flex flex-col gap-2 p-2">
          <button
            className="hover:text-red-600 hover:rotate-[360deg] hover:scale-110 cursor-pointer transition-all text-yellow-600"
            onClick={handleDeleteFavItem}
          >
            <StarIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default FavTableData;
