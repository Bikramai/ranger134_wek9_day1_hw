import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //BrowserRouter as alias name Router
import { ThemeProvider } from "@mui/material/styles";


// Internal imports
import { Home, Shop, Cart } from './components';
import './index.css'
import { theme } from './Theme/themes'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme = { theme }>
      
        <Router>
          <Routes>
            <Route path='/' element={<Home title = {"Experience the Zen of Abode"}/>} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
    </ThemeProvider>
  </React.StrictMode>,
)
