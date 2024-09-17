import React from 'react'
import { PublicationData } from '../types/publicationData'

function TableData(data:PublicationData) {
  return (
    <>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${data.title}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.price}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.description}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
      <a href="${data.link}" target="_blank" className="hover:underline">Ver enlace</a>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <img src="${data.image}" alt="Car Image" className="w-32 h-32 object-cover rounded"/>
    </td>
    </>

  )
}

export default TableData
