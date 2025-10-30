import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

function CadastroColaborador() {
	const { idParam } = useParams();

	const navigate = useNavigate();

	const [id, setId] = useState('');
	const [nome, setNome] = useState('');
	const [gerente, setGerente] = useState('');

	function inicializar() {
		setId('');
		setNome('');
		setGerente('');
	}

	async function salvar() {
		if (idParam == null) {
			mensagemSucesso(`Departamento ${nome} cadastrado com sucesso!`);
			navigate(`/listar-departamentos`);
		} else {
			mensagemSucesso(`Departamento ${nome} alterado com sucesso!`);
			navigate(`/listar-departamentos`);
		}
	}

	function buscar() {
		const mockData = {
			id: idParam,
			login: 'Departamento.mockado',
			cpf: '12345678900',
			admin: true,
		};

		setId(mockData.id);
		setNome(mockData.nome);
		setGerente(mockData.gerente);
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
			<Card title='Cadastro de Departamento'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<FormGroup label='Nome:' htmlFor='inputNome'>
								<input
									type='text'
									id='inputNome'
									value={nome}
									className='form-control'
									name='nome'
									onChange={(e) => setNome(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Gerente:' htmlFor='inputGerente'>
								<input
									type='text'
									maxLength='11'
									id='inputGerente'
									value={gerente}
									className='form-control'
									name='gerente'
									onChange={(e) => setGerente(e.target.value)}
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

export default CadastroColaborador;