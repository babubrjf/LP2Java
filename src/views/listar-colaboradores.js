import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const mockData = [
	{ id: 1, login: 'marcoantonio@email.com', cpf: '111.111.111-11', admin: true },
	{ id: 2, login: 'pablorodrigues@email.com', cpf: '222.222.222-22', admin: false },
	{ id: 3, login: 'carloseduardo@email.com', cpf: '333.333.333-33', admin: false },
];

function ListarColaboradores() {
	const navigate = useNavigate();

	const cadastrar = () => {
		navigate(`/cadastro-colaboradores`);
	};

	const editar = (id) => {
		navigate(`/cadastro-colaboradores/${id}`);
	};

	const [dados, setDados] = React.useState(mockData);

	async function excluir(id) {
		mensagemSucesso(`Usuário excluído com sucesso!`);
		setDados(
			dados.filter((dado) => {
				return dado.id !== id;
			})
		);
	}

	return (
		<div className='container'>
			<Card title='Listagem de Colaboradores'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<button type='button' className='btn btn-warning' onClick={() => cadastrar()}>Novo Colaborador</button>
							<table className='table table-hover'>
								<thead>
									<tr>
										<th scope='col'>Login</th>
										<th scope='col'>CPF</th>
										<th scope='col'>Administrador</th>
										<th scope='col'>Ações</th>
									</tr>
								</thead>
								<tbody>
									{dados.map((dado) => (
										<tr key={dado.id}>
											<td>{dado.login}</td>
											<td>{dado.cpf}</td>
											<td>{dado.admin ? 'Sim' : 'Não'}</td>
											<td>
												<Stack spacing={1} padding={0} direction='row'>
													<IconButton aria-label='edit' onClick={() => editar(dado.id)}><EditIcon /></IconButton>
													<IconButton aria-label='delete' onClick={() => excluir(dado.id)}><DeleteIcon /></IconButton>
												</Stack>
											</td>
										</tr>
									))}
								</tbody>
							</table>{' '}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default ListarColaboradores;
