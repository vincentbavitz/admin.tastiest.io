import React from 'react';

export class VuroxBroadListItems extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className={this.props.className + ' vurox-list-items-stacked'} style={{backgroundColor: this.props.fills}}>
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
}
export class ListHeading extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='heading'>
				{this.props.children}
			</div>
		)
	}
}
export class VuroxListContainer extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<ul>
				{this.props.children}
			</ul>
		)
	}
}
