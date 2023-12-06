import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //BrowserRouter as alias name Router
import { ThemeProvider } from "@mui/material/styles";
import { FirebaseAppProvider } from 'reactfire'; //specfic app to allow to connect firevbase
import 'firebase/auth';


// Internal imports
import { Home, Shop, Cart, Auth } from './components';
import './index.css'
import { theme } from './Theme/themes'
import { firebaseConfig } from './firebaseConfig'; //firebaseConfig is our variable name



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>  
      <ThemeProvider theme = { theme }>
        <Router>
          <Routes>
            <Route path='/' element={<Home title = {"Experience the Zen of Abode"}/>} />
            <Route path='/auth' element={<Auth title = {"Experience the Zen of Abode"}/>} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
     </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
