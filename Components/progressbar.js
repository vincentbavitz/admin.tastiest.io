import React from 'react'
export class VuroxProgressbar extends React.Component {
	render() {
		return (
			<div className='vurox-progressbar-section'>
				
			<div className="vurox-progressbar-container vurox-dark" >
				<p className="vurox-text-sizes">{this.props.progresstextleft}<span className="fright">{this.props.progresstextright}</span></p>
				<div className="vurox-progress vurox-br-5">
					<div style={{width: this.props.width, backgroundColor: this.props.progresscolor}}></div>
				</div>
			</div>
			</div> 
		);
	}
}