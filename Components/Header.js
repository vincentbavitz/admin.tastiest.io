import React from 'react';
import Link from 'next/link'
import { Row, Col } from 'react-bootstrap'

export default class VuroxHeader extends React.Component {
	switchHeaderVersion(ver){
		switch(ver){
			case 'dark':
				return 'vurox-dark-version'
			case 'light':
				return 'vurox-light-version'
			default:
				return 'vurox-dark-version'
		}
	}
	render() {

		return (
			<div className={this.switchHeaderVersion(this.props.version) + ' vurox-admin-template'}>
				<div className="vurox-admin-header">
					<div className="container-fluid">
						{this.props.children}
				    </div>
				</div>
			</div>
		);
	}
}

export const VuroxBrand = (props) => {
  return (
	<div className={props.className + " vurox-navbar-brand d-flex align-content-center flex-wrap"}>
		{ props.image !== '' ? <img src={props.image} /> : <h2>Brand</h2> }
	</div>
  )
}


export const VuroxMenuToggler = (props) => {
  return (
    0
  )
}


