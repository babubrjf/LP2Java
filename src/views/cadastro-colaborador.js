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
	const [login, setLogin] = useState('');
	const [cpf, setCpf] = useState('');
	const [dataNascimento, setDataNascimento] = useState('');
	const [senha, setSenha] = useState('');
	const [senhaRepeticao, setSenhaRepeticao] = useState('');
	const [admin, setAdmin] = useState(false);

	function inicializar() {
		setId('');
		setLogin('');
		setCpf('');
		setDataNascimento('');
		setSenha('');
		setSenhaRepeticao('');
		setAdmin(false);
	}

	async function salvar() {
		if (idParam == null) {
			mensagemSucesso(`Colaborador ${login} cadastrado com sucesso!`);
			navigate(`/listar-colaboradores`);
		} else {
			mensagemSucesso(`Colaborador ${login} alterado com sucesso!`);
			navigate(`/listar-colaboradores`);
		}
	}

	function buscar() {
		const mockData = {
			id: idParam,
			login: 'colaborador.mockado',
			cpf: '12345678900',
			dataNascimento: '15/10/1996',
			admin: true,
		};

		setId(mockData.id);
		setLogin(mockData.login);
		setCpf(mockData.cpf);
		setDataNascimento(mockData.dataNascimento);
		setSenha('');
		setSenhaRepeticao('');
		setAdmin(mockData.admin);
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
			<Card title=' Cadastro de Colaborador'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component'>
							<FormGroup label='Nome Completo:' htmlFor='inputLogin'>
								<input
									type='text'
									id='inputLogin'
									value={login}
									className='form-control'
									name='login'
									onChange={(e) => setLogin(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Data de Nascimento:' htmlFor='inputDataNascimento'>
								<input
									type='date'
									id='inputDataNascimento'
									value={login}
									className='form-control'
									name='dataNascimento'
									onChange={(e) => setDataNascimento(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='CPF:' htmlFor='inputCpf'>
								<input
									type='text'
									maxLength='11'
									id='inputCpf'
									value={cpf}
									className='form-control'
									name='cpf'
									onChange={(e) => setCpf(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Senha:' htmlFor='inputSenha'>
								<input
									type='password'
									id='inputSenha'
									value={senha}
									className='form-control'
									name='senha'
									onChange={(e) => setSenha(e.target.value)}
								/>
							</FormGroup>
							<FormGroup label='Repita a Senha:' htmlFor='inputRepitaSenha'>
								<input
									type='password'
									id='inputRepitaSenha'
									value={senhaRepeticao}
									className='form-control'
									name='senhaRepeticao'
									onChange={(e) => setSenhaRepeticao(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<input
									className='form-check-input'
									type='checkbox'
									id='checkAdmin'
									checked={admin}
									name='admin'
									onChange={(e) => setAdmin(e.target.checked)}
								/>
								Gerente
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