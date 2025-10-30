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

const baseURL = `${BASE_URL}/documentos`;
const colaboradoresURL = `${BASE_URL}/colaboradores`;

const formatarData = (data) => {
	if (!data) return 'N/A';
	const [ano, mes, dia] = data.split('-');
	return `${dia}/${mes}/${ano}`;
};

function ListagemDocumentos() {
	const navigate = useNavigate();

	const cadastrar = () => {
		navigate(`/cadastro-documento`);
	};

	const editar = (id) => {
		navigate(`/cadastro-documento/${id}`);
	};

	const [dados, setDados] = React.useState(null);
	const [colaboradores, setColaboradores] = React.useState(null);

	const colaboradorMap = React.useMemo(() => {
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
				mensagemSucesso(`Documento excluído com sucesso!`);
				setDados(
					dados.filter((dado) => {
						return dado.id !== id;
					})
				);
			})
			.catch(function (error) {
				mensagemErro(`Erro ao excluir o Documento`);
			});
	}

	React.useEffect(() => {
		const fetchDocumentos = axios.get(baseURL);
		const fetchColaboradores = axios.get(colaboradoresURL);

		Promise.all([fetchDocumentos, fetchColaboradores])
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
			<Card title='Listagem de Documentos'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<table className='table table-hover'>
								<thead>
									<tr>
										<th scope='col'>Colaborador</th>
										<th scope='col'>Tipo</th>
										<th scope='col'>Nome do Arquivo</th>
										<th scope='col'>Data Emissão</th>
										<th scope='col'>Ações</th>
									</tr>
								</thead>
								<tbody>
									{dados.map((dado) => (
										<tr key={dado.id}>
											<td>
												{colaboradorMap.get(dado.idColaborador) ||
													`ID: ${dado.idColaborador}`}
											</td>
											<td>{dado.tipoDocumento}</td>
											<td>{dado.nomeArquivo}</td>
											<td>{formatarData(dado.dataEmissao)}</td>
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
								Novo Documento
							</button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default ListagemDocumentos;

