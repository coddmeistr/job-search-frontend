import './App.css';
import HeaderC from './HeaderC/HeaderC.jsx';
import Content from './Content/Content';
import { useEffect } from 'react';
import { authAPI } from './API';
import { fetchAllVacancies } from './redux/vacanciesReducer';
import { useDispatch } from 'react-redux';
import { getAuthData } from './redux/authReducer';

function App() {
  const dispatch = useDispatch()

  async function setLogin(){
      let response = await dispatch(getAuthData())
      let authData = response.payload.data

      // Просрочен ли токен
      if (Date.now()*1000-authData.ttl){
          
      }

      localStorage.setItem("token", JSON.stringify(authData))
  }

  useEffect(() => {
      setLogin()
  }, [])

  return (
      <div className="App">
        <HeaderC />
        <Content />
      </div>
  );
}

export default App;
