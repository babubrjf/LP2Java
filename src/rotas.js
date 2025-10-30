import React from 'react';

import Home from './views/home';
import Login from './views/login';

// Listagens
import ListarColaboradores from './views/listar-colaboradores';
import ListarDepartamentos from './views/listar-departamentos';
import ListarCargos from './views/listar-cargos';
import ListarDocumentos from './views/listar-documentos';

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
				<Route path='/listar-departamentos' element={<ListarDepartamentos />} />
				<Route path='/listar-cargos' element={<ListarCargos />} />
				<Route path='/listar-documentos' element={<ListarDocumentos />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Rotas;
