import React from 'react'
export class VuroxChartsBoxHead extends React.Component {
	render() {
		return (
			<div className={this.props.className + ' vurox-admin-components-block vurox-dark vurox-chart-box-standard-padding' }>
				{this.props.children}
			</div>
		);
	}
}

export const vuroxDarkToolTipStyles = {
	backgroundColor:'#000',
	border: 'none',
	borderRadius: '3px',
	fontSize: '12px',
	bottom: '1px'
}


export class VuroxChartsLegend extends React.Component{
	constructor( props ){
		super(props)
	}
	render(){
		return(
			<div className={this.props.type + ' vurox-charts-legend'}>
				<span style={{backgroundColor: this.props.fill}} className={this.props.shape}></span>
				<p className='vurox-text-sizes'>{this.props.text}</p>
			</div>	
		)
	}
}
export const processDualChartsData = ( data1, data2, newProp1, newProp2, newProp3, limit ) => {
	let chartData = data1.map( (item, i) => Object.assign( {}, {[newProp1]: item.date, [newProp2]: item.value}, {[newProp3]: data2[i].value} ) )
	return chartData.slice(0, limit)
}
export const VuroxCustomTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
    return (
	     <g className="recharts-layer recharts-polar-angle-axis-tick">
	        <text
	          radius={radius}
	          stroke={stroke}
	          x={x}
	          y={y}
	          className="recharts-text recharts-polar-angle-axis-tick-value vurox-radar-charts-styles"
	          text-anchor={textAnchor}
	          fill='#ccc'
	        >
          		<tspan x={x} dy="0em">
            		{payload.value}
          		</tspan>
        	</text>
      	</g>
    );
}