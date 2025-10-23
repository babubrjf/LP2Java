import React from 'react';

import Home from './views/home';
import Login from './views/login';

// Listagens
import ListarColaboradores from './views/listar-colaboradores';

// Cadastros
import CadastroColaborador from './views/cadastro-colaborador';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
		<Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro-colaboradores/:idParam?' element={<CadastroColaborador />} />
        <Route path='/listar-colaboradores' element={<ListarColaboradores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
