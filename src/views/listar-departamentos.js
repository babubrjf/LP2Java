import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/departamentos`;
const colaboradoresURL = `${BASE_URL}/colaboradores`;

function ListagemDepartamentos() {
	const navigate = useNavigate();

	const cadastrar = () => {
		navigate(`/cadastro-departamento`);
	};

	const editar = (id) => {
		navigate(`/cadastro-departamento/${id}`);
	};

	const [dados, setDados] = React.useState(null);
	const [colaboradores, setColaboradores] = React.useState(null);

	const gerenteMap = React.useMemo(() => {
		if (!colaboradores) {
			return new Map();
		}
		return colaboradores.reduce((map, colaborador) => {
			map.set(colaborador.id, colaborador.nome || colaborador.login);
			return map;
		}, new Map());
	}, [colaboradores]);

	async function excluir(id) {
		let data = JSON.stringify({ id });
		let url = `${baseURL}/${id}`;
		await axios
			.delete(url, data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(function (response) {
				mensagemSucesso(`Departamento excluído com sucesso!`);
				setDados(
					dados.filter((dado) => {
						return dado.id !== id;
					})
				);
			})
			.catch(function (error) {
				mensagemErro(`Erro ao excluir o Departamento`);
			});
	}

	React.useEffect(() => {
		const fetchDepartamentos = axios.get(baseURL);
		const fetchColaboradores = axios.get(colaboradoresURL);

		Promise.all([fetchDepartamentos, fetchColaboradores])
			.then((responses) => {
				setDados(responses[0].data);
				setColaboradores(responses[1].data);
			})
			.catch((error) => {
				mensagemErro(`Erro ao buscar dados: ${error.message}`);
			});
	}, []);

	if (!dados || !colaboradores) return null;

	return (
		<div className='container'>
			<Card title='Listagem de Departamentos'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<table className='table table-hover'>
								<thead>
									<tr>
										<th scope='col'>Nome</th>
										<th scope='col'>Gerente</th>
										<th scope='col'>Ações</th>
									</tr>
								</thead>
								<tbody>
									{dados.map((dado) => (
										<tr key={dado.id}>
											<td>{dado.nome}</td>
											<td>
												{gerenteMap.get(dado.idGerente) ||
													`ID: ${dado.idGerente}`}
											</td>
											<td>
												<Stack spacing={1} padding={0} direction='row'>
													<IconButton
														aria-label='edit'
														onClick={() => editar(dado.id)}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														aria-label='delete'
														onClick={() => excluir(dado.id)}
													>
														<DeleteIcon />
													</IconButton>
												</Stack>
											</td>
										</tr>
									))}
								</tbody>
							</table>{' '}
							<button
								type='button'
								style={{ float: 'right' }}
								className='btn btn-primary'
								onClick={() => cadastrar()}
							>
								Novo Departamento
							</button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default ListagemDepartamentos;

