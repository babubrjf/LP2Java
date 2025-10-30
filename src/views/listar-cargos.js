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

const baseURL = `${BASE_URL}/cargos`;

// Função para formatar como moeda BRL
const formatarMoeda = (valor) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(valor);
};

function ListarCargos() {
	const navigate = useNavigate();

	const cadastrar = () => {
		navigate(`/listar-cargos`);
	};

	const editar = (id) => {
		navigate(`/listar-cargos/${id}`);
	};

	const [dados, setDados] = React.useState(null);

	async function excluir(id) {
		let data = JSON.stringify({ id });
		let url = `${baseURL}/${id}`;
		await axios
			.delete(url, data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(function (response) {
				mensagemSucesso(`Cargo excluído com sucesso!`);
				setDados(
					dados.filter((dado) => {
						return dado.id !== id;
					})
				);
			})
			.catch(function (error) {
				mensagemErro(`Erro ao excluir o Cargo`);
			});
	}

	React.useEffect(() => {
		axios.get(baseURL).then((response) => {
			setDados(response.data);
		});
	}, []);

	if (!dados) return null;

	return (
		<div className='container'>
			<Card title='Listagem de Cargos'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<table className='table table-hover'>
								<thead>
									<tr>
										<th scope='col'>Nome</th>
										<th scope='col'>Salário Base</th>
										<th scope='col'>Ações</th>
									</tr>
								</thead>
								<tbody>
									{dados.map((dado) => (
										<tr key={dado.id}>
											<td>{dado.nome}</td>
											<td>{formatarMoeda(dado.salarioBase)}</td>
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
								Novo Cargo
							</button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default ListarCargos;
