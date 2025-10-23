import React from 'react';
import { useNavigate } from 'react-router-dom';

// Estou assumindo que o componente Card está nesta localização,
// como nos seus outros arquivos.
import Card from '../components/card';

/**
 * Componente para a tela inicial do sistema.
 */
function Home() {
	return (
		<div className='container' style={{ marginTop: '50px' }}>
			<Card title='Bem-vindo ao Sistema de RH!'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='bs-component' style={{ textAlign: 'center' }}>
							<hr />
							<br />
							<h3>
								Utilize o menu de navegação para acessar as funcionalidades do sistema.
							</h3>
							<br />
							<hr />
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default Home;
