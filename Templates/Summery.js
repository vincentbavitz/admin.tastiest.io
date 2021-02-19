import React from 'react';
import {Space} from 'antd'
import $ from 'jquery'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
class Summery extends React.Component {
	componentDidMount(){
		$('.slideHidden').on('click', () => {
			$('.slideHiddenContent').slideToggle()
		} )
	}
	render() {
		return (
			<div className="vurox-admin-summery">
				<Row>
					<Col lg={12} md={10} xs={24}>
						<Row>
							<Col xs={16}>
								<div className="vurox-admin-welcome pb-3">
									<h5>Hi,{this.props.users.username} Welcome back</h5>
									<p className="vurox-text-sizes">Welcome to <span className="vurox-color-red">vurox</span> dashboard</p>
								</div>
							</Col>
							<Col xs={8} className='d-block d-sm-none'>
								<button className='btn btn-sm bg-green-5 fright slideHidden'>Info</button>
							</Col>
						</Row>
					</Col>
					<Col lg={12} md={14} className='d-none d-sm-block slideHiddenContent'>
						<Space size={40} className="fright">
							<Col>
								<p className="vurox-text-sizes">Customer Rating</p>
								<p className='stars-container vurox-rating-block mr-2'>
									★★★★★
								</p>
								<p className="vurox-text-sizes rating-number">
									( 23947 )
								</p>
							</Col>
							<Col>
								<p className="vurox-text-sizes">All time sales<span className="vurox-online">Online</span></p>
								<h5 className="mb-0">{this.props.users.currency}{this.props.users.salesVolume}</h5>
							</Col>
							<Col>
								<button type="button" className="float-none float-sm-right mr-2 btn white bg-magenta-5 btn-md rounded hover-color my-3 my-sm-0">Export data <i className='ti-export'></i></button>
							</Col>
						</Space>
					</Col>
				</Row>
				<Row className="mb-2">
					<Col md={12}>
						<div className="vurox-tabs-underlined vurox-dark vurox-tabs-underlined-left mt-3 mb-1">
							<ul className="nav nav-pills vurox-dropdown-list" id="vurox-tab" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" id="overview" data-toggle="pill" href="#overview" role="tab">Overview</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" id="audiences" data-toggle="pill" href="#audiences" role="tab">Audiences</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" id="demographics" data-toggle="pill" href="#demographics" role="tab">Demographics</a>
								</li>
							</ul>
						</div>
					</Col>
					<Col md={12}>
							<div className="fright">
								<ul className="vurox-horizontal-links vurox-standard-ul pt-3">
									<li><a href=""><i className="ti-save"></i> save report</a></li>
									<li><a href=""><i className="ti-book"></i> Export to PDF</a></li>
									<li><a href=""><i className="ti-email"></i> Send to email</a></li>
								</ul>
							</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default connect( state=>state )(Summery)