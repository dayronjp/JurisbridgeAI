import React from 'react';
import ReactDom from 'react-dom/client';
import Home from './containers/Home';
import Register from './containers/Register/register';
import Conectse from './containers/Conectese/conecte';
import Login from './containers/Login/login';
import JurisIa from './containers/JurisIA/jurisia'
import Globalstyles from './styles/globalstyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Jurisia from './containers/JurisIA/jurisia';
import Perfil from './containers/Perfil/perfil';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Globalstyles />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/conectese" element={<Conectse />} /> 
        <Route path="/login" element={<Login />} />
        <Route path ="/jurisia" element ={<Jurisia />} />
        <Route path = "/perfil" element = {<Perfil />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
