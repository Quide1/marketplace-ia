import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='bg-blue-950 min-h-screen flex-col flex items-center '>
      <div className='bg-white container text-center py-4'>
        <h1 className='text-4xl font-bold'>MarketPlace Epic Scraper</h1>
        <div className='py-4 text-2xl text-center'>
        <label >
          Url a scrapear: 
          <input className='border-2 mx-2 rounded-lg border-black p-2 text-blue-600' type="text" placeholder='https:/motosusadas'/>

        </label>
        </div>
       
      </div>
    </main>
  )
}

export default App
