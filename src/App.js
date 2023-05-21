/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import HeaderC from './HeaderC/HeaderC.jsx';
import Content from './Content/Content';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getRefreshedToken, setAuth } from './redux/authReducer';
import Preloader from './Preloader/Preloader';

function App() {
  const dispatch = useDispatch()

  // selectors
  const isAuth = useSelector(state => state.auth.isAuth)
  const authError = useSelector(state => state.auth.authError)

  // Try to get access token if it is in the local storage
  async function getTokenInLocalStorage() {
    let tokenStr = localStorage.getItem("token")
    if (tokenStr !== undefined && tokenStr !== null && tokenStr !== "") {
      let token = JSON.parse(tokenStr)
      // check if fetched token is outofdate
      if (token.ttl < Date.now() / 1000) {
        let response = await dispatch(getRefreshedToken(token.refresh_token))
        if (response.meta.requestStatus === "rejected") {
          return false
        }
        token = response.payload.data
      }

      localStorage.setItem("token", JSON.stringify(token))
      return true
    } else {
      return false
    }
  }

  // Get access by fetching from server
  async function getTokenByFetching() {
    let response = await dispatch(getAccessToken())
    if (response.meta.requestStatus === "rejected") {
      return false
    }

    let authData = response.payload.data

    if (authData === undefined) {
      return false
    }

    // check if fetched token is outofdate
    if (authData.ttl < Date.now() / 1000) {
      response = await dispatch(getRefreshedToken(authData.refresh_token))
      if (response.meta.requestStatus === "rejected") {
        return false
      }
      authData = response.payload.data
    }

    localStorage.setItem("token", JSON.stringify(authData))
    return true
  }
  // get access token or refresh existing one
  async function manageLogin() {
    let isTokenOK = await getTokenInLocalStorage()
    if (!isTokenOK) {
      isTokenOK = await getTokenByFetching()
      if (!isTokenOK) {
        return
      }
    }
    dispatch(setAuth(true))
  }

  // on render
  useEffect(() => {
    manageLogin()
  }, [])

  return (
    <div className="App">
      <HeaderC />
      {authError !== null ? <div>{`Произошла ошибка авторизации. Описание ошибки: ${authError.text}`}</div> : <></>}
      {isAuth ? <Content /> : authError === null ?
        <div className='authMsg'>
          <div className='authText'>
            Происходит аторизация. Подождите...
          </div>
          <div className="preloader"><Preloader /></div>
        </div> : <></>}
    </div>
  );
}

export default App;
