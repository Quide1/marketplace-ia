import { useDataContext } from "../context/dataContext";
import { PublicationData } from "../types/publicationData";

const cleanDescription = (desc: string) => {
  return desc.replace(/Ver menos/g, "");
};

import { StarIcon, CircleXIcon } from "lucide-react";
function TableData({
  image,
  price,
  link,
  title,
  description,
  uuid,
}: PublicationData) {
  const dataContext = useDataContext();

  if (!dataContext) return null; // Manejar si no hay contexto (en casos donde el componente no esté envuelto en el provider)

  const { deleteItem, addOfFavData } = dataContext;
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
            className="hover:text-red-700 hover:scale-110 cursor-pointer transition-all"
            onClick={() => deleteItem(uuid)}
          >
            <CircleXIcon />
          </button>
          <button
            className="hover:text-yellow-600 hover:scale-110 cursor-pointer transition-all"
            onClick={() => {
              addOfFavData({ image, price, link, title, description, uuid });
              deleteItem(uuid)
            }}
          >
            <StarIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableData;
