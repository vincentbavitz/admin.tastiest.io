import React from 'react';
export class VuroxAdvancedTableHeading extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className={ this.props.className + " vurox-box-headings vurox-stats-box has-bg-img-right"} style={{backgroundImage: 'url(' + this.props.bgimg + ')', backgroundColor: this.props.fill }}>
				{this.props.children}
			</div>	
		)
	}
}
export class VuroxTableHeading extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="vurox-stats-box-normal has-bg-img-right">
				{this.props.children}
			</div>	
		)
	}
}
export class VuroxTableDark extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className={this.props.className + ' vurox-admin-table vurox-table-dark vurox-admin-primary-bg'}>
				{this.props.children}
			</div>	
		)
	}
}