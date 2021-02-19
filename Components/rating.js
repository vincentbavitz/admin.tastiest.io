import React from 'react';
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
			<li>
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
