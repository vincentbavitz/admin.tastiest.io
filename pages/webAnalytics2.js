import React from 'react';
import Link from 'next/link'
import {	
	VuroxTableHeading, 
	VuroxTableDark
} from 'Components/tables'

import { 
	VuroxChartsBoxHead, 
	processDualChartsData,
	vuroxDarkToolTipStyles
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
import Sidebar from 'Templates/HeaderSidebar';
import {connect} from 'react-redux'

import { Row, Col } from 'antd'


import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, LineChart, Line, linearGradient, PieChart, Pie, Sector
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

		this.setState({doubleBarChartData: barChartData }, () => console.log(this.state.doubleBarChartData))
		this.setState({doubleBarChartData2: barChartData2 }, () => console.log(this.state.doubleBarChartData))
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
					<ContentLayout className='vurox-scroll-y p-3'>
						<Summery />

						<Row gutter={{xs:4, sm:6, md:8}}>
							<Col md={14}>
								<VuroxComponentsContainer className="p-4 rounded-top">
									<Row>
										<Col md={12}>
											<h5>Website Audience Metric</h5>
											<p className="vurox-text-sizes mb-2">
												Total number of session within the date range
											</p>
										</Col>
										<Col md={12}>
											<ul className='vurox-horizontal-links boxed fright mb-3'>
												<li><Link href=""><a className='active'>All</a></Link></li>
												<li><Link href=""><a>Today</a></Link></li>
												<li><Link href=""><a>Weekly</a></Link></li>
												<li><Link href=""><a>Monthly</a></Link></li>
											</ul>
										</Col>
									</Row>
									<Row>
										<Col md={8} xs={24}>
											
											<ResponsiveContainer className="d-inline-block" width='30%' height={60}>
												<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
													<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
													<Bar dataKey="value" fill="#00bcd4" barSize={2} barGap ={2} />
												</BarChart>
											</ResponsiveContainer>

											<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">
												{this.props.company.visitors[0].dailyTotal } 
												<small className="vurox-text-sizes"> Visits
												</small>
											</h4>

										</Col>
										<Col md={8} xs={24}>
											<ResponsiveContainer className="d-inline-block" width='30%' height={60}>
												<BarChart data={this.props.company.orders[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
													<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
													<Bar dataKey="value" fill="#50bc5e" barSize={2} barGap ={2} />
												</BarChart>
											</ResponsiveContainer>
											<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">{this.props.company.orders[0].dailyTotal} <small className="vurox-text-sizes"> New Users</small></h4>
											
										</Col>
										<Col md={8} xs={24}>
											<ResponsiveContainer className="d-inline-block" width='30%' height={60}>
												<BarChart data={this.props.company.bounce[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
													<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
													<Bar dataKey="value" fill="#F7614D" barSize={2} barGap ={2} />
												</BarChart>
											</ResponsiveContainer>
											<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">{this.props.company.bounce[0].dailyTotal}% <small className="vurox-text-sizes"> Bounce rate</small></h4>
										</Col>
									</Row>
								</VuroxComponentsContainer>
								<VuroxComponentsContainer className="vurox-admin-secondary-bg mt-n2 rounded-bottom mb-2">
									<Row className="vurox-chart-box-standard-padding">
										<Col md={14}>
											<h5>Revenue Sharing</h5>
											<p className="vurox-text-sizes mb-2">
												Total number of session within the date range
											</p>
										</Col>
										<Col md={10}>
											<ul className='vurox-horizontal-links boxed fright mb-3'>
												<li><Link href=""><a className='active'>All</a></Link></li>
												<li><Link href=""><a>Today</a></Link></li>
												<li><Link href=""><a>Weekly</a></Link></li>
												<li><Link href=""><a>Monthly</a></Link></li>
											</ul>
										</Col>
									</Row>
									<ResponsiveContainer width='100%' height={240} >	
										<LineChart data={this.state.doubleBarChartData}
											margin={{ top: 10, right: 40, left: 0, bottom: 0 }}>
											<XAxis stroke="#ccc" tickLine={false} axisLine={false} />
											<YAxis stroke="#ccc" tickLine={false} axisLine={false} domain={[0, 300]} />
											<CartesianGrid horizontal={false} strokeDasharray="1 1" opacity={0.15} />
											<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
											<Line type="linear" dataKey="visitors" stroke="#F7614D" fillOpacity={1} strokeWidth={2} dot={{ fill: '#F7614D', strokeWidth: 3 }} />
											<Line type="linear" dataKey="profit" stroke="#50bc5e" fillOpacity={1} strokeWidth={1} opacity={0.5} dot={false}/>
										</LineChart>
									</ResponsiveContainer>	
								</VuroxComponentsContainer>
							</Col>
							<Col md={10}>
								<Row gutter={{xs:4, sm:6, md:8}}>
									<Col sm={12} xs={24}>
										<VuroxComponentsContainer className="mb-2">
											<VuroxChartsBoxHead>
												<Row>
													<Col md={12} sm={12}>
														<h4 className="mb-1">33.50%</h4>
														<p className="vurox-text-sizes">
															Bounce Rate
														</p>
													</Col>
													<Col md={12} sm={12}>
														<p className="fright vurox-color-green"><i className="ti-stats-up"></i> +1.34% </p>
													</Col>
												</Row>
											</VuroxChartsBoxHead>
											<ResponsiveContainer width='100%' height={130} >	
												<AreaChart data={this.props.company.bounce[0].monthlyStats}
													margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
													<defs>
													<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
														<stop offset="5%" stopColor="#00C150" stopOpacity={0.5}/>
														<stop offset="95%" stopColor="#00C150" stopOpacity={0}/>
													</linearGradient>
													</defs>
													<CartesianGrid vertical={false} horizontal={false} strokeDasharray="1 1" />
													<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
													<Area type="linear" dataKey="value" stroke="#00C150" fillOpacity={1} fill="url(#colorUv)" />
												</AreaChart>
											</ResponsiveContainer>
										</VuroxComponentsContainer>
									</Col>
									<Col sm={12} xs={24}>
										<VuroxComponentsContainer>
											<VuroxChartsBoxHead>
												<Row>
													<Col md={12} sm={12}>
														<h4 className="mb-1">33.50%</h4>
														<p className="vurox-text-sizes">
															Total Users
														</p>
													</Col>
													<Col md={12} sm={12}>
														<p className="fright vurox-color-red"><i className="ti-stats-down"></i> -2.34% </p>
													</Col>
												</Row>
											</VuroxChartsBoxHead>
											<ResponsiveContainer width='100%' height={130}>
												<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 0, left: 0, bottom: 1 }}>
													<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
													<Bar dataKey="value" fill="#F7614E" barSize={10} barGap ={2} />
												</BarChart>
											</ResponsiveContainer>
										</VuroxComponentsContainer>
									</Col>
								</Row>
								<VuroxComponentsContainer>	 
									<VuroxChartsBoxHead>
										<div className="pb-3">
											<h5>Sales Analytics</h5>
											<p className="vurox-text-sizes">Audiences to which the user belong the currecnt users</p>
										</div>
										<Row>
											<Col md={10}>
												<ResponsiveContainer width='100%' height={140}>
													<PieChart>
														<Pie data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={20} outerRadius={60} fill="#8884d8" paddingAngle={5} dataKey="value" stroke={0}>
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
											</Col>
										</Row>
									</VuroxChartsBoxHead>
								</VuroxComponentsContainer>
							</Col>
						</Row>
						<Row gutter={{xs:4, sm:6, md:8}}>
							<Col md={14}>
								<VuroxComponentsContainer className="mb-2">
									<VuroxTableDark className='mt-2'>
										<VuroxTableHeading>

											<h5>Most Visited Pages</h5>
											<p className="vurox-text-sizes">Audiences to which the user belong</p>
												
										</VuroxTableHeading>
										<table className="table table-borderless mb-0">
											<thead>
												<tr>
													<th>Page Name</th>
													<th></th>
													<th>Pageviews</th>
													<th>Unique view</th>
													<th>Entrances</th>
													<th>Bounce rate</th>
													<th>% Exits</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th>
													Main Home Page
													<small className='d-block'>/demo/main/index.html</small>
													</th>
													<td><i className='ti-share vurox-color-sky-blue'></i></td>
													<td>73284</td>
													<td>2334</td>
													<td>560</td>
													<td>23.78%</td>
													<td className='vurox-color-sky-blue'>12.33%</td>
												</tr>
												<tr>
													<th>
													UI Kit
													<small className='d-block'>/demo/main/ui-kit.html</small>
													</th>
													<td><i className='ti-share vurox-color-sky-blue'></i></td>
													<td>73284</td>
													<td>2334</td>
													<td>560</td>
													<td>23.78%</td>
													<td>12.33%</td>
												</tr>
												<tr>
													<th>
													Form Elements
													<small className='d-block'>/demo/main/forms.html</small>
													</th>
													<td><i className='ti-share vurox-color-sky-blue'></i></td>
													<td>73284</td>
													<td>2334</td>
													<td>560</td>
													<td>23.78%</td>
													<td>12.33%</td>
												</tr>
												<tr>
													<th>
													Utilities
													<small className='d-block'>/demo/main/utilities.html</small>
													</th>
													<td><i className='ti-share vurox-color-sky-blue'></i></td>
													<td>73284</td>
													<td>2334</td>
													<td>560</td>
													<td>23.78%</td>
													<td>22.33%</td>
												</tr>
												<tr>
													<th>
													Modals
													<small className='d-block'>/demo/main/modals.html</small>
													</th>
													<td><i className='ti-share vurox-color-sky-blue'></i></td>
													<td>73284</td>
													<td>2334</td>
													<td>560</td>
													<td>23.78%</td>
													<td>34.33%</td>
												</tr>
											</tbody>
										</table>
									</VuroxTableDark>
								</VuroxComponentsContainer>
							</Col>
							<Col md={10}>
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
												<tr>
													<th><img src="/image/flags/canada.svg" />Canada</th>
													<td className="fright">$123,783</td>
												</tr>
											</tbody>
										</table>
									</VuroxTableDark>
								</VuroxComponentsContainer>
							</Col>
						</Row>
						<Row gutter={{xs:4, sm:6, md:8}} className="mb-2">
							<Col md={8}>
								<VuroxComponentsContainer>
									<VuroxChartsBoxHead>
										<h5>Aquisition</h5>
										<p className="vurox-text-sizes">Tells you where your visitors originates from</p>
										<Row className='pt-5 pr-2 pl-2'>
											<Col md={12} xs={24}>
												
												<ResponsiveContainer className="rounded bg-purple-6 align-top d-inline-block mr-2 mt-1" width='30%' height={50}>
													<BarChart data={this.props.company.cost}  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
														<Bar dataKey="value" fill="#fff" barSize={3} barGap ={2} />
													</BarChart>
												</ResponsiveContainer>
												<div className="d-inline-block">
													<p className="vurox-text-sizes">Bounce Rate</p>
													<h3 className='vurox-fw-300'>43.50%</h3>
												</div>
											</Col>
											<Col md={12} xs={24}>
												<ResponsiveContainer className="rounded bg-cyan-6 align-top d-inline-block mr-2 mt-1" width='30%' height={50}>
													<BarChart data={this.props.company.cost}  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
														<Bar dataKey="value" fill="#fff" barSize={3} barGap ={2} />
													</BarChart>
												</ResponsiveContainer>
												<div className="d-inline-block">
													<p className="vurox-text-sizes">Sessions</p>
													<h3 className='vurox-fw-300'>34342</h3>
												</div>
											</Col>
										</Row>
									</VuroxChartsBoxHead>

								</VuroxComponentsContainer>
							</Col>
							<Col md={8}>
								<VuroxComponentsContainer>
									<VuroxChartsBoxHead>
										<h5>Aquisition</h5>
										<p className="vurox-text-sizes">Tells you where your visitors originates from</p>
										<Row className='pt-5'>
											<Col md={12} xs={24}>
												<ResponsiveContainer className='d-inline-block align-top mr-2' width='40%' height={60}>
													<PieChart>
														<Pie data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={15} outerRadius={30} fill="#8884d8" paddingAngle={0} dataKey="value" stroke={0}>
															{
															this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
															}
														</Pie>
													</PieChart>
												</ResponsiveContainer>
												<div className="d-inline-block">
													<p className="vurox-text-sizes">New Sessions</p>
													<h3 className='vurox-fw-300'>34442</h3>
												</div>
											</Col>
											<Col md={12} xs={24}>
												<ResponsiveContainer className='d-inline-block align-top mr-2' width='40%' height={60}>
													<PieChart>
														<Pie data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={0} outerRadius={30} fill="#8884d8" paddingAngle={1} dataKey="value" stroke={0}>
															{
															this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
															}
														</Pie>
													</PieChart>
												</ResponsiveContainer>
												<div className="d-inline-block">
													<p className="vurox-text-sizes">Page/Session</p>
													<h3 className='vurox-fw-300'>342</h3>
												</div>
											</Col>
										</Row>
									</VuroxChartsBoxHead>

								</VuroxComponentsContainer>
							</Col>
							<Col md={8}>
								<VuroxComponentsContainer>
									<VuroxChartsBoxHead className='pb-1'>
										<Row>
											<Col md={16}>
												<h5>All Sessions</h5>
												<p className="vurox-text-sizes">
													It is the period a user is actively engaged with your website page or app
												</p>
											</Col>
											<Col md={8}>
												<h5 className="mb-0 fright vurox-color-red">23.33% <small className="vurox-sm-stats"><i className="ti-stats-up"></i></small></h5>
												<p className="fright vurox-sm-stats vurox-text-sizes">Bounce rate</p>
											</Col>
										</Row>
									</VuroxChartsBoxHead>
									<ResponsiveContainer width='100%' height={98} >	
										<BarChart data={this.props.company.visitors[0].weeklyStats}  margin={{ top: 20, right: 0, left: 0, bottom: 1 }}>
											<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
											<Bar dataKey="value" fill="#F7614E" barSize={15} barGap ={2} />
										</BarChart>
									</ResponsiveContainer>
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