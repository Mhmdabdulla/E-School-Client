
import { BrowserRouter, Routes } from 'react-router-dom'
// import './App.css'
import { commonRoutes } from './routes/common.routes'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { refreshToken } from './services/authServices';
import { userRoutes } from './routes/user.routes';

function App() {

    const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
         await refreshToken(dispatch);

      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dispatch]);

  if (loading) return <div />;
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      {commonRoutes}
      {userRoutes}
    </Routes>
    </BrowserRouter>      
    </>
  )
}

export default App
