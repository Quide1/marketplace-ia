import { PublicationData } from "../types/publicationData";

const cleanDescription = (desc: string) => {
  return desc.replace(/Ver menos/g, "");
};

function TableData({
  image,
  price,
  link,
  title,
  description,
}: PublicationData) {
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
    </tr>
  );
}

export default TableData;
