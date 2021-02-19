import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {	
	VuroxTableHeading, 
	VuroxAdvancedTableHeading, 
	VuroxTableDark
} from 'Components/tables'

import { 
	VuroxChartsBoxHead, 
	VuroxChartsLegend, 
	processDualChartsData
} from 'Components/charts'
import { VuroxProgressbar } from 'Components/progressbar' 
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from '../context'

import HeaderDark from 'Templates/HeaderDark';
import Summery from 'Templates/Summery';
import AdminSummeryBox from 'Templates/AdminSummeryBox';
import Sidebar from 'Templates/HeaderSidebar';

import { Row, Col } from 'antd'


import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, linearGradient, PieChart, Pie, Sector
} from 'recharts';


class index extends React.Component {
	static contextType = vuroxContext
	state = {
		doubleBarChartData: [],
		doubleBarChartData2: []
	}

	componentDidMount(){
		const visitors = this.props.company.visitors[0].dailyStats
		const profit = this.props.company.profit
		let barChartData = processDualChartsData( visitors, profit, 'date', 'visitors', 'profit', 20 )
		let barChartData2 = processDualChartsData( visitors, profit, 'date', 'visitors', 'profit', 7 )

		this.setState({doubleBarChartData: barChartData })
		this.setState({doubleBarChartData2: barChartData2 })
	}
	render() {
		const { menuState } = this.context
		const toggleClass = menuState ? 'menu-closed' : 'menu-open'
		return (
			<React.Fragment>
				<HeaderLayout className="sticky-top">
					<HeaderDark />
				</HeaderLayout>
				<VuroxLayout>
					<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
						<Sidebar className={toggleClass} />
					</VuroxSidebar>
					<ContentLayout className='p-3 vurox-scroll-y'>
					<Summery />
						<AdminSummeryBox />
						<Row gutter={{xs: 4, sm:6, md: 8}}>
							<Col md={16}>
								<VuroxComponentsContainer>
									<VuroxChartsBoxHead>
										<Row gutter={{xs: 4, sm:6, md: 8}}>
											<Col md={12} className='mb-4'>
												<h5>Sales Report</h5>
												<p className="vurox-text-sizes">Total number of session within the date range</p>
											</Col>
											<Col md={12}>
												<ul className='vurox-horizontal-links boxed fright'>
													<li><Link href=""><a className='active'>All</a></Link></li>
													<li><Link href=""><a>Today</a></Link></li>
													<li><Link href=""><a>Weekly</a></Link></li>
													<li><Link href=""><a>Monthly</a></Link></li>
												</ul>
												<div className="fright pt-3">
													<VuroxChartsLegend fill='#F7614E' text='Order Value' type='horizontal' shape='rectangle' />
													<VuroxChartsLegend fill='#7B4DFF' text='Total Download' type='horizontal' shape='rectangle' />
												</div>
											</Col>
										</Row>
									</VuroxChartsBoxHead>
									<ResponsiveContainer width='100%' height={280} >
										<BarChart data={this.state.doubleBarChartData2} margin={{top: 0, right: 15, left: -15, bottom: 5}}>
											<XAxis dataKey="date" stroke="#ccc" tickLine={false} axisLine={false} />
											<YAxis stroke="#ccc" tickLine={false} axisLine={false} />
											<CartesianGrid vertical={false} strokeDasharray="1 1" opacity={0.3} />
											<Tooltip cursor={false}  />
											<Bar dataKey="visitors" fill="#F7614E" barSize={20} />
											<Bar dataKey="profit" fill="#7B4DFF" barSize={20}/>
										</BarChart>
									</ResponsiveContainer>
								</VuroxComponentsContainer>
								<VuroxComponentsContainer className="mt-2">
									<VuroxTableDark>
										<VuroxAdvancedTableHeading className="constant-white" bgimg='//image/bg-map.png' fill='#1E5EE9'>
											<Row>
												<Col md={8}>
													<h5>Your Top Countries</h5>
													<p className="vurox-text-sizes">Audiences to which the user belong</p>
												</Col>
												<Col md={16}>
													<Row>
														<Col md={8}>
															<div className="br-1-w align-right">
																<p className="vurox-text-sizes">My funds</p>
																<h4 className="vurox-fw-300">$209384234</h4>
															</div>
														</Col>
														<Col md={8}>										
															<div className="br-1-w align-right">
																<p className="vurox-text-sizes">Earnings</p>
																<h4 className="vurox-fw-300">$56456</h4>
															</div>
														</Col>
														<Col md={8}>
															<div className="br-1-w align-right">
																<p className="vurox-text-sizes">Tax withheld</p>
																<h4 className="vurox-fw-300">$233</h4>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
										</VuroxAdvancedTableHeading>
										<Row className='pl-4 pr-4 pt-3 pb-3'>
											<Col md={12}>
												<ul className='vurox-horizontal-links boxed'>
													<li><Link href=""><a className='active'>Last 30 days</a></Link></li>
													<li><Link href=""><a>Apr 2020</a></Link></li>
													<li><Link href=""><a>Feb 2020</a></Link></li>
												</ul>
											</Col>
											<Col md={12}>
												<ul className='vurox-horizontal-links boxed vurox-admin-secondary-bg fright'>
													<li><Link href=""><a><i className='ti-angle-left'></i></a></Link></li>
													<li><Link href=""><a className='active'>1</a></Link></li>
													<li><Link href=""><a>2</a></Link></li>
													<li><Link href=""><a>3</a></Link></li>
													<li><Link href=""><a><i className='ti-angle-right'></i></a></Link></li>
												</ul>
											</Col>
										</Row>
										<table className="table table-borderless">
											<thead>
												<tr>
													<th>Date</th>
													<th>Order ID</th>
													<th>Product Details</th>
													<th>Client info</th>
													<th className="align-right">Type</th>
													<th className="align-right">Price</th>
													<th className="align-right">Earnings</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th>06 Apr 2020</th>
													<td>#0293844</td>
													<td>Dashboard component</td>
													<td>Hipster limited</td>
													<td className="align-right"><span className="vurox-label vurox-bg-yellow">Pending</span></td>
													<td className="align-right">$200</td>
													<td className="align-right">$180</td>
												</tr>
												<tr>
													<th>04 Apr 2020</th>
													<td>#0293844</td>
													<td>Chartjs pie chart</td>
													<td>Geek force</td>
													<td className="align-right"><span className="vurox-label vurox-bg-green">Finished</span></td>
													<td className="align-right">$1200</td>
													<td className="align-right">$1000</td>
												</tr>
												<tr>
													<th>04 Apr 2020</th>
													<td>#0293844</td>
													<td>UI kit bundle pack</td>
													<td>Research</td>
													<td className="align-right"><span className="vurox-label vurox-bg-red">In 1 day</span></td>
													<td className="align-right">$2000</td>
													<td className="align-right">$1600</td>
												</tr>
												<tr>
													<th>04 Apr 2020</th>
													<td>#0293844</td>
													<td>Design works</td>
													<td>Time studio</td>
													<td className="align-right"><span className="vurox-label vurox-bg-light-violet">In progress</span></td>
													<td className="align-right">$50</td>
													<td className="align-right">$35</td>
												</tr>
											</tbody>
										</table>
									</VuroxTableDark>
								</VuroxComponentsContainer>
							</Col>
							<Col md={8}>
								<VuroxComponentsContainer>
									<VuroxTableHeading>
										<h5>Your Top Countries</h5>
										<p className="vurox-text-sizes">Audiences to which the user belong the currecnt users</p>
									</VuroxTableHeading>
									<VuroxTableDark>
										<table className="table table-borderless">
											<thead>
												<tr>
													<th>Country</th>
													<th className="fright">Earnings</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th><img src="/image/flags/united-states.svg" /> United States</th>
													<td className="fright">$239,847,234</td>
												</tr>
												<tr>
													<th><img src="/image/flags/canada.svg" />Canada</th>
													<td className="fright">$123,783</td>
												</tr>
												<tr>
													<th><img src="/image/flags/france.svg" />France</th>
													<td className="fright">$234,234</td>
												</tr>
												<tr>
													<th><img src="/image/flags/india.svg" />India</th>
													<td className="fright">$234,234</td>
												</tr>
												<tr>
													<th><img src="/image/flags/uk.svg" />United kingdom</th>
													<td className="fright">$234,234</td>
												</tr>
											</tbody>
										</table>
									</VuroxTableDark>
								</VuroxComponentsContainer>	
								<VuroxComponentsContainer className="mt-2">	
									<VuroxChartsBoxHead>
										<div className="pb-4">
											<h5>Sales Analytics</h5>
											<p className="vurox-text-sizes">Audiences to which the user belong the currecnt users</p>
										</div>
										<Row className='py-2'>
											<Col md={12} xs={12}>
																
												<p className="vurox-text-sizes">This Month </p>
												<ResponsiveContainer className="d-inline-block mt--15" width='40%' height={63}>
													<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
														<Tooltip cursor={false} />
														<Bar dataKey="value" fill="#F7614D" barSize={2} barGap ={2} />
													</BarChart>
												</ResponsiveContainer>

												<h4 className="vurox-fw-300 d-inline-block align-bottom">
													<small className="vurox-sm-stats vurox-color-red"><i className="ti-stats-down"></i> -4.34%
													</small>
												</h4>
												<h4 className="vurox-fw-300 align-bottom mt--7">
													${this.props.company.visitors[0].dailyTotal }
												</h4>


											</Col>
											<Col md={12} xs={12}>
																
												<p className="vurox-text-sizes mb-0">Last Month </p>
												<ResponsiveContainer className="d-inline-block mt--15" width='40%' height={63}>
													<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
														<Tooltip cursor={false} />
														<Bar dataKey="value" fill="#50bc5e" barSize={2} barGap ={2} />
													</BarChart>
												</ResponsiveContainer>

												<h4 className="vurox-fw-300 d-inline-block align-bottom">
													<small className="vurox-sm-stats vurox-color-green"><i className="ti-stats-up"></i> +4.34%
													</small>
												</h4>
												<h4 className="vurox-fw-300 align-bottom mt--7">
													${this.props.company.visitors[0].monthlyTotal }
												</h4>

											</Col>
										</Row>
										<Row>
											<Col md={10}>
												<ResponsiveContainer width='100%' height={150}>
													<PieChart>
														<Pie
															data={this.props.company.piedata}
															startAngle={360}
															endAngle={0}
															innerRadius={0}
															outerRadius={60}
															fill="#8884d8"
															paddingAngle={5}
															dataKey="value"
															stroke={0}>
															{
															this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
															}
														</Pie>
													</PieChart>
												</ResponsiveContainer>
											</Col>
											<Col md={14} xs={24}>
												<VuroxProgressbar progresstextleft='Online sales' progresstextright='$984.6' progresscolor='#7B4DFF' width='45%' />

												<VuroxProgressbar progresstextleft='Offline sales' progresstextright='$23984.6' progresscolor='#F7614E' width='85%' />

												<VuroxProgressbar progresstextleft='Marketing' progresstextright='$984.6' progresscolor='#f9be49' width='60%' />

												<VuroxProgressbar progresstextleft='Support sales' progresstextright='$984.6' progresscolor='#00C150' width='78%' />
											</Col>
										</Row>
									</VuroxChartsBoxHead>
								</VuroxComponentsContainer>	
							</Col>
						</Row>
				
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)