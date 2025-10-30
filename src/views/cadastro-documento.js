import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

function CadastroDocumento() {
	const { idParam } = useParams();

	const navigate = useNavigate();

	const [id, setId] = useState('');
	const [colaborador, setColaborador] = useState('');
	const [tipo, setTipo] = useState('');
	const [nomeArquivo, setNomeArquivo] = useState('');
	const [dataEmissao, setDataEmissao] = useState('');

	function inicializar() {
		setId('');
		setColaborador('');
		setTipo('');
		setNomeArquivo('');
		setDataEmissao('');
	}

	async function salvar() {
		if (idParam == null) {
			mensagemSucesso(`Colaborador ${colaborador} cadastrado com sucesso!`);
			navigate(`/listar-colaboradores`);
		} else {
			mensagemSucesso(`Colaborador ${colaborador} alterado com sucesso!`);
			navigate(`/listar-colaboradores`);
		}
	}

	function buscar() {
		const mockData = {
			id: idParam,
			colaborador: 'colaborador.mockado',
			tipo: '12345678900',
			admin: true,
		};

		setId(mockData.id);
		setColaborador(mockData.colaborador);
		setTipo(mockData.tipo);
		setNomeArquivo('');
		setDataEmissao('');
	}

	useEffect(() => {
		if (idParam) {
			buscar();
		} else {
			inicializar();
		}
	}, [idParam]);

	return (
		<div className='container'>
			<Card title='Cadastro de Documentos'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<FormGroup label='Nome do Colaborador:' htmlFor='inputColaborador'>
								<input
									type='text'
									id='inputColaborador'
									value={colaborador}
									className='form-control'
									name='colaborador'
									onChange={(e) => setColaborador(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Tipo do Arquivo:' htmlFor='inputTipo'>
								<input
									type='text'
									maxLength='11'
									id='inputTipo'
									value={tipo}
									className='form-control'
									name='tipo'
									onChange={(e) => setTipo(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Nome Arquivo:' htmlFor='inputArquivo'>
								<input
									type='text'
									id='inputArquivo'
									value={nomeArquivo}
									className='form-control'
									name='nomeArquivo'
									onChange={(e) => setNomeArquivo(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Data de Emissão:' htmlFor='inputLogin'>
								<input
									type='date'
									id='inputLogin'
									value={colaborador}
									className='form-control'
									name='colaborador'
									onChange={(e) => setColaborador(e.target.value)}
								/>
							</FormGroup>
							<Stack spacing={1} padding={1} direction='row'>
								<button
									onClick={salvar}
									type='button'
									className='btn btn-success'
								>
									Salvar
								</button>
								<button
									onClick={inicializar}
									type='button'
									className='btn btn-danger'
								>
									Cancelar
								</button>
							</Stack>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default CadastroDocumento;