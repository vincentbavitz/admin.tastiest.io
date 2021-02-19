import React from 'react';

export class VuroxChartsBoxHead extends React.Component {
	render() {
		return (
			<div className={this.props.className + ' vurox-admin-components-block vurox-dark vurox-chart-box-standard-padding' }>
				{this.props.children}
			</div>
		);
	}
}

export class VuroxComponentsContainer extends React.Component {
	render() {
		return (
			<div className={this.props.className + ' vurox-admin-primary-bg vurox-admin-components-block overview-hidden'} style={{backgroundColor: this.props.fillbg}}>	
				{this.props.children}							
			</div>
		);
	}
}


export class VuroxProgressbar extends React.Component {
	render() {
		return (
			<div className={this.props.className + ' vurox-progressbar-section'}>
				
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

export class VuroxAdvancedTableHeading extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="vurox-box-headings vurox-stats-box has-bg-img-right" style={{backgroundImage: 'url(' + this.props.bgimg + ')', backgroundColor: this.props.fill }}>
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
export class VuroxLinksBlue extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="vurox-horizontal-links boxed blue-links">
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
}
export class VuroxLinksRed extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className={this.props.className + ' vurox-horizontal-links boxed vurox-admin-secondary-bg'}>
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
}
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
export class VuroxRatingBlock extends React.Component{
	constructor(props){
		super(props)
		this.vuroxRatingRound = this.vuroxRatingRound.bind(this)
		this.vuroxRatingStars = this.vuroxRatingStars.bind(this)
	}
	vuroxRatingRound(x, precision) {
	    var y = +x + (precision === undefined ? 0.5 : precision/2);
	    y = y - (y % (precision === undefined ? 1 : +precision));
	    return y.toFixed(1)
	}
	vuroxRatingStars(val){
		return val*10*2;
	}
	render(){
		return(
			<li className={this.props.className}>
				<img src={this.props.image} alt="review-author" />
				<span className="absolute-right">{this.props.time}</span>
				<div className="vurox-list-desc vw-80">
					<h6>{this.props.author}</h6>
					<p className={'stars-' + this.vuroxRatingStars(this.vuroxRatingRound(this.props.rating, 0.5)) + ' stars-container vurox-rating-block mr-2'}>
						★★★★★
					</p>
					<p className="vurox-text-sizes rating-number align-middle">
						{ this.vuroxRatingRound(this.props.rating, 0.5) }
					</p>
					<p className="vurox-text-sizes pt-1">
						{this.props.reviewText}
					</p>
				</div>
			</li>
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