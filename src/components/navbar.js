import React from 'react';
import 'bootswatch/dist/zephyr/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
	return (
		<div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
			<div className='container'>
				<a href='/' className='navbar-brand'>
					SRH
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarResponsive'
					aria-controls='navbarResponsive'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarResponsive'>
					<ul className='navbar-nav'>
						<NavbarItem
							render='true'
							href='/listar-colaboradores'
							label='Colaboradores'
						/>
					</ul>
					<ul className='navbar-nav'>
						<NavbarItem
							render='true'
							href='/listar-departamentos'
							label='Departamentos'
						/>
					</ul>
					<ul className='navbar-nav'>
						<NavbarItem
							render='true'
							href='/listar-cargos'
							label='Cargos'
						/>
					</ul>
					<ul className='navbar-nav'>
						<NavbarItem
							render='true'
							href='/listar-documentos'
							label='Documentos'
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
