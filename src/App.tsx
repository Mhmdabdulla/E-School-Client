
import { BrowserRouter, Routes } from 'react-router-dom'
// import './App.css'
import { commonRoutes } from './routes/common.routes'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      {commonRoutes}
    </Routes>
    </BrowserRouter>      
    </>
  )
}

export default App
