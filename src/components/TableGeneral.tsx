import  { ReactNode } from 'react'

interface TableProps {
    children: ReactNode;
}
function TableGeneral(TableProps:TableProps) {
  return (
    <div className="overflow-x-auto">
    <table id="scrapResultsTable" className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
        </tr>
      </thead>
      <tbody id="scrapResultsBody" className="bg-white divide-y divide-gray-200">
        {TableProps.children}
      </tbody>
    </table>
  </div>
  
  )
}

export default TableGeneral
