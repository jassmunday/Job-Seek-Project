import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'

export const Context = createContext({isAuthorized:false});

const AppWriter = () => {

  const [isAuthorized,setIsAuthorized] = useState(false);
  const [user,setUser] = useState({});

  return (
      <Context.Provider value={{ isAuthorized , setIsAuthorized , user , setUser }}>
          <App/>
      </Context.Provider> 
  )
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWriter/>
  </React.StrictMode>,
)
