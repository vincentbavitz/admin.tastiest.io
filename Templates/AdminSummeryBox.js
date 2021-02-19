import React from 'react'
import {connect} from 'react-redux'
import { VuroxComponentsContainer} from 'Components/layout' 
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Row, Col } from 'antd'
const vuroxDarkToolTipStyles = {
	backgroundColor:'#000',
	border: 'none',
	borderRadius: '3px',
	fontSize: '12px'
}
class AdminSummeryBox extends React.Component {
	render() {
		return (
			<Row gutter={{xs:4, sm:6, md:8}}>
				<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
					<div className="vurox-admin-components-block rounded overview-hidden bg-cyan-7">
						<div className="vurox-admin-components-block-content bg-cyan-7 constant-white">
							<h6 className="text-white">Total Sales</h6>
							<h3 className="text-white">650000 <small><i className="ti-stats-up"></i> 2.00% (30 days)</small></h3>
							<i className=""></i>
						</div>
						<ResponsiveContainer width='100%' height={100}>
							<LineChart data={this.props.company.sales} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
								<XAxis dataKey="date" hide={true} />
								<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
								<Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</Col>
				<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
					<div className="vurox-admin-components-block rounded overview-hidden bg-blue-7">
						<div className="vurox-admin-components-block-content bg-blue-7 constant-white">
							<h6 className="text-white">Total Cost</h6>
							<h3 className="text-white">$55000 <small><i className="ti-stats-up"></i> 2.00% (30 days)</small></h3>
							<i className=""></i>
						</div>
						<ResponsiveContainer width='100%' height={100}>
							<LineChart data={this.props.company.cost} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
								<XAxis dataKey="date" hide={true} />
								<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
								<Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</Col>
				<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
					<div className="vurox-admin-components-block rounded overview-hidden bg-purple-7">
						<div className="vurox-admin-components-block-content constant-white">
							<h6 className="text-white">Total Revenue</h6>
							<h3 className="text-white">$35000 <small><i className="ti-stats-down"></i> 1.112% (30 days)</small></h3>
							<i className=""></i>
						</div>
						<ResponsiveContainer width='100%' height={100}>
							<LineChart data={this.props.company.revenue} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
								<XAxis dataKey="date" hide={true} />
								<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
								<Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</Col>
				<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
					<div className="vurox-admin-components-block rounded overview-hidden bg-green-7">
						<div className="vurox-admin-components-block-content constant-white">
							<h6 className="text-white">Total Profit</h6>
							<h3 className="text-white">$55000 <small><i className="ti-stats-up"></i> 2.00% (30 days)</small></h3>
							<i className=""></i>
						</div>
						<ResponsiveContainer width='100%' height={100}>
							<LineChart data={this.props.company.profit} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
								<XAxis dataKey="date" hide={true} />
								<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
								<Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</Col>
			</Row>
		);
	}
}

export default connect( state=>state )(AdminSummeryBox)