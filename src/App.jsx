import { RouterProvider } from 'react-router-dom'
import router from './Router/Routes/Routes'

import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className='max-w-screen-2xl mx-auto mx-10'>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster></Toaster>
    </div>
  )
}

export default App
