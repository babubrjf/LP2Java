import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

function CadastroCargo() {
	const { idParam } = useParams();

	const navigate = useNavigate();

	const [id, setId] = useState('');
	const [nome, setNome] = useState('');
	const [salarioBase, setSalarioBase] = useState('');

	function inicializar() {
		setId('');
		setNome('');
		setSalarioBase('');
	}

	async function salvar() {
		if (idParam == null) {
			mensagemSucesso(`Colaborador ${nome} cadastrado com sucesso!`);
			navigate(`/listar-colaboradores`);
		} else {
			mensagemSucesso(`Colaborador ${nome} alterado com sucesso!`);
			navigate(`/listar-colaboradores`);
		}
	}

	function buscar() {
		const mockData = {
			id: idParam,
			nome: 'colaborador.mockado',
			salarioBase: '12345678900',
			admin: true,
		};

		setId(mockData.id);
		setNome(mockData.nome);
		setSalarioBase(mockData.salarioBase);
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
			<Card title='Cadastro de Cargo'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<FormGroup label='Nome do Cargo:' htmlFor='inputnome'>
								<input
									type='text'
									id='inputnome'
									value={nome}
									className='form-control'
									name='nome'
									onChange={(e) => setNome(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Salário Base:' htmlFor='inputSalarioBase'>
								<input
									type='text'
									maxLength='11'
									id='inputSalarioBase'
									value={salarioBase}
									className='form-control'
									name='salarioBase'
									onChange={(e) => setSalarioBase(e.target.value)}
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

export default CadastroCargo;