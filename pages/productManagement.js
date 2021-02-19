import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import { 
	VuroxRatingBlock
} from 'Components/rating';

import {
	VuroxBroadListItems,
	ListHeading,
	VuroxListContainer,
} from 'Components/list'

import {	
	VuroxTableHeading, 
	VuroxAdvancedTableHeading, 
	VuroxTableDark
} from 'Components/tables'

import { 
	VuroxChartsBoxHead, 
	VuroxChartsLegend, 
	processDualChartsData,
	VuroxCustomTick 
} from 'Components/charts'
import { VuroxProgressbar } from 'Components/progressbar' 
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'


import HeaderDark from 'Templates/HeaderDark';
import Summery from 'Templates/Summery';
import AdminSummeryBox from 'Templates/AdminSummeryBox';
import Sidebar from 'Templates/HeaderSidebar';
import { vuroxContext } from '../context'
import { Row, Col } from 'antd'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CartesianAxis, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Label, AreaChart, Area, PieChart, Pie
} from 'recharts';

const piedata = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
];
const COLORS = ['#7B4DFF', '#F7614E', '#f9be49'];

const vuroxDarkToolTipStyles = {
	backgroundColor:'#000',
	border: 'none',
	borderRadius: '3px',
	fontSize: '12px',
	bottom: '1px'
}
class index extends React.Component {
	
	static contextType = vuroxContext
	state = {
		menuInitialClosed: true,
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
		const {menuState} = this.context
		const menuStateNow = this.state.menuInitialClosed === menuState ? false : true
		const toggleClass = menuStateNow ? 'menu-open' : 'menu-closed'

		return (
			<React.Fragment>
				<HeaderLayout className="sticky-top">
					<HeaderDark />
				</HeaderLayout>
				<VuroxLayout>
					<VuroxSidebar width={240} className={`sidebar-container initial-closed ${toggleClass}`} >
						<Sidebar className={toggleClass} />
					</VuroxSidebar>
					<ContentLayout className='vurox-scroll-y'>
							<Row gutter={{xs:4, md:8}}>
								<Col md={19} className="pt-3 pl-3 pb-2 pr-1">
										<Summery />
										
										<Row className="mb-2" gutter={{xs:4, sm:6, md:8}}>
											<Col md={10} xs={24}>
												<VuroxComponentsContainer>
													<VuroxChartsBoxHead>
														<Row>
															<Col md={20}>
																<h6>Customers</h6>
																<h3 className='vurox-fw-300'>650,000</h3>
																<p className="vurox-text-sizes vurox-fw-700"><span className='vurox-color-ocean-blue'><i className='ti-stats-up'></i> 2.00%</span> (Avg. Customers/Day)</p>
															</Col>
															<Col md={4}>
																<div className="vurox-charts-icon fright mt-4">
																	<i className="ti-plug vurox-bg-light-violet"></i>
																</div>
															</Col>
														</Row>
													</VuroxChartsBoxHead>
													<ResponsiveContainer width='100%' height={80} >	
														<AreaChart data={this.state.doubleBarChartData}
															margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
															<defs>
																<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
																	<stop offset="5%" stopColor="#60cadf" stopOpacity={0.5}/>
																	<stop offset="95%" stopColor="#60cadf" stopOpacity={0}/>
																</linearGradient>
																<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
																	<stop offset="5%" stopColor="#9738e2" stopOpacity={0.5}/>
																	<stop offset="75%" stopColor="#9738e2" stopOpacity={0}/>
																</linearGradient>
															</defs>
															<CartesianGrid vertical={false} horizontal={false} strokeDasharray="1 1" />
															<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
															<Area type="linear" dataKey="visitors" fill='#60cadf' stroke="#60cadf" fillOpacity={0.8}/>
															<Area type="linear" dataKey="profit" stroke="#9738e2" fill="#9738e2" fillOpacity={0.8}/>
														</AreaChart>
													</ResponsiveContainer>
												</VuroxComponentsContainer>
											</Col>
											<Col md={14}>
												<VuroxComponentsContainer>
													<VuroxChartsBoxHead className='pb-1'>
														<Row>
															<Col md={18}>
																<h5>All Sessions</h5>
																<p className="vurox-text-sizes">
																	It is the period a user is actively engaged with your website pages
																</p>
															</Col>
															<Col md={6} className='align-right'>
																<h5 className="mb-0 vurox-color-green d-block">23.33% <small className="vurox-sm-stats"><i className="ti-stats-up"></i></small></h5>
																<p className="vurox-sm-stats vurox-text-sizes">Bounce rate</p>
															</Col>
														</Row>
													</VuroxChartsBoxHead>
													<ResponsiveContainer width='100%' height={145} >	
														<BarChart data={this.props.company.visitors[0].weeklyStats}  margin={{ top: 20, right: 0, left: 0, bottom: 1 }}>
															<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
															<Bar dataKey="value" fill="rgb(0, 193, 80)" barSize={15} barGap ={2} />
														</BarChart>
													</ResponsiveContainer>
												</VuroxComponentsContainer>
											</Col>
										</Row>
										<Row gutter={{xs:4, sm:6, md:8}} className="mb-2">
											<Col md={10} xs={24}>
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
																	<th><img src="/image/flags/turkey.svg" />Turkey</th>
																	<td className="fright">$24,234</td>
																</tr>
															</tbody>
														</table>
													</VuroxTableDark>
												</VuroxComponentsContainer>
											</Col>
											<Col md={14}>
												<VuroxComponentsContainer>
													<VuroxChartsBoxHead>
														<Row>
															<Col md={12}>
																<h5>Order And downloads</h5>
																<p className="vurox-text-sizes mb-2">Total number of session within the date</p>
															</Col>
															<Col md={12}>
																<ul className='vurox-horizontal-links boxed mb-3'>
																	<li><Link href=""><a className='active'>All</a></Link></li>
																	<li><Link href=""><a>Today</a></Link></li>
																	<li><Link href=""><a>Weekly</a></Link></li>
																	<li><Link href=""><a>Monthly</a></Link></li>
																</ul>
																<div className="mt-2">
																	<VuroxChartsLegend fill='#7B4DFF' text='Today' type='horizontal' shape='rectangle' />
																	<VuroxChartsLegend fill='#F7614E' text='Yesterday' type='horizontal' shape='rectangle' />
																</div>
															</Col>
														</Row>
														<Row className='mt-4'>
															<Col md={12} xs={24}>
																<p className="vurox-text-sizes"><b>Order values</b></p>
																<h4 className="vurox-fw-300">$354,000 <small><i className=""></i></small></h4>		
															</Col>
															<Col md={12} xs={24}>
																<p className="vurox-text-sizes"><b>Total Donwloads</b></p>
																<h4 className="vurox-fw-300">$354,00</h4>	
															</Col>
														</Row>
													</VuroxChartsBoxHead>
													<ResponsiveContainer width='100%' height={280} >
														<BarChart data={this.state.doubleBarChartData} margin={{top: 0, right: 15, left: -15, bottom: 5}}>
															<XAxis dataKey="date" stroke="#ccc" tickLine={false} axisLine={false} />
															<YAxis stroke="#ccc" tickLine={false} axisLine={false} />
															<CartesianGrid vertical={false} strokeDasharray="1 1" opacity={0.2} />
															<Tooltip cursor={false}  contentStyle={vuroxDarkToolTipStyles} />
															<Bar dataKey="visitors" fill="#7B4DFF" barSize={6} />
															<Bar dataKey="profit" fill="#F7614E" barSize={6}/>
														</BarChart>
													</ResponsiveContainer>
												</VuroxComponentsContainer>
											</Col>
										</Row>
										<Row className="mb-2" gutter={{xs:4, sm:6, md:8}}>
											<Col md={16}>
												<Row gutter={{xs:4, sm:6, md:8}}>
													<Col md={12} xs={24}>
														<VuroxComponentsContainer>
															<VuroxChartsBoxHead>
																<h5>Aquisition</h5>
																<p className="vurox-text-sizes">Tells you where your visitors originates from</p>
																<Row className='pt-4 pr-2 pl-2'>
																	<Col md={12} xs={12}>
																		<ResponsiveContainer className="bg-green-6 align-top d-inline-block mr-2 mt-1 rounded" width='30%' height={40}>
																			<BarChart data={this.props.company.cost}  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
																				<Bar dataKey="value" fill="#fff" barSize={3} barGap ={2} />
																			</BarChart>
																		</ResponsiveContainer>
																		<div className="d-inline-block">
																			<p className="vurox-text-sizes">Bounce Rate</p>
																			<h5 className='vurox-fw-600'>43.50%</h5>
																		</div>
																	</Col>
																	<Col md={12} xs={12}>
																		<ResponsiveContainer className="vurox-bg-red align-top d-inline-block mr-2 mt-1" width='30%' height={35}>
																			<BarChart data={this.props.company.cost}  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
																				<Bar dataKey="value" fill="#fff" barSize={3} barGap ={2} />
																			</BarChart>
																		</ResponsiveContainer>
																		<div className="d-inline-block">
																			<p className="vurox-text-sizes">Sessions</p>
																			<h5 className='vurox-fw-600'>34342</h5>
																		</div>
																	</Col>
																</Row>
															</VuroxChartsBoxHead>

														</VuroxComponentsContainer>
													</Col>
													<Col md={12} xs={24}>
														<VuroxComponentsContainer>
															<VuroxChartsBoxHead>
																<h5>Aquisition</h5>
																<p className="vurox-text-sizes">Tells you where your visitors originates from</p>
																<Row className='pt-1 mt-3 mb-1'>
																	<Col md={12} xs={12}>
																		<ResponsiveContainer className='d-inline-block align-top mr-2' width='32%' height={45}>
																			<PieChart>
																				<Pie data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={10} outerRadius={20} fill="#8884d8" paddingAngle={0} dataKey="value" stroke={0}>
																					{
																					this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
																					}
																				</Pie>
																			</PieChart>
																		</ResponsiveContainer>
																		<div className="d-inline-block">
																			<p className="vurox-text-sizes">New Sessions</p>
																			<h5 className='vurox-fw-600'>34442</h5>
																		</div>
																	</Col>
																	<Col md={12} xs={12}>
																		<ResponsiveContainer className='d-inline-block align-top mr-2' width='40%' height={45}>
																			<PieChart>
																				<Pie data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={0} outerRadius={20} fill="#8884d8" paddingAngle={1} dataKey="value" stroke={0}>
																					{
																					this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
																					}
																				</Pie>
																			</PieChart>
																		</ResponsiveContainer>
																		<div className="d-inline-block">
																			<p className="vurox-text-sizes">Page/Sess</p>
																			<h5 className='vurox-fw-600'>342</h5>
																		</div>
																	</Col>
																</Row>
															</VuroxChartsBoxHead>

														</VuroxComponentsContainer>
													</Col>
													<Col md={24}>
														
														<VuroxComponentsContainer className='mt-2'>
															<VuroxTableDark>
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
																	</tbody>
																</table>
															</VuroxTableDark>
														</VuroxComponentsContainer>
													</Col>
												</Row>
											</Col>
											<Col md={8} xs={24}>
												<VuroxComponentsContainer>
													<VuroxChartsBoxHead>
														<h5>Sales report</h5>
														<p className='vurox-text-sizes'>Tells you where your visitors originated from</p>
													</VuroxChartsBoxHead>
													<ResponsiveContainer width='100%' height={185}>
														<PieChart>
															<Pie cx='50%' cy='50%' data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={35} outerRadius={85} fill="#8884d8" paddingAngle={0} dataKey="value" stroke={0}>
																{
																this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
																}
															</Pie>
														</PieChart>
													</ResponsiveContainer>
													<Col md={24} className='p-4'>
														<VuroxProgressbar progresstextleft='Online sales' progresstextright='$984.6' progresscolor='#7B4DFF' width='45%' />

														<VuroxProgressbar progresstextleft='Offline sales' progresstextright='$23984.6' progresscolor='#F7614E' width='85%' />

														<VuroxProgressbar progresstextleft='Marketing' progresstextright='$984.6' progresscolor='#f9be49' width='60%' />
														<VuroxProgressbar progresstextleft='Offline sales' progresstextright='$23984.6' progresscolor='#F7614E' width='85%' />
													</Col>
												</VuroxComponentsContainer>
											</Col>
										</Row>
											
								</Col>
								<Col md={5}>
									<VuroxComponentsContainer className="rounded-bottom">
										<VuroxBroadListItems>
											<ListHeading>
												<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> Clustar Status</p>
											</ListHeading>
											<Row className='ml-3 absolute-full'>
												<Col md={6}>
													<h3 className='vurox-fw-300 mb-0'>56%</h3>
													<p><small>Unique users</small></p>
												</Col>
												<Col md={6}>
													<h3 className='vurox-fw-300 mb-0'>4.5</h3>
													<p><small>Bounce Rate</small></p>
												</Col>
											</Row>
											<ResponsiveContainer width='100%' height={100} >	
												<AreaChart data={this.props.company.visitors[0].dailyStats}
												  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
												  <defs>
												    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
												      <stop offset="52%" stopColor="#00C150" stopOpacity={0.5}/>
												      <stop offset="95%" stopColor="#00C150" stopOpacity={0}/>
												    </linearGradient>
												  </defs>
												  <CartesianGrid vertical={false} horizontal={false} strokeDasharray="1 1" />
												  <Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
												  <Area type="linear" dataKey="value" stroke="#00C150" strokeWidth={0} fillOpacity={1} fill="url(#colorUv)" />
												</AreaChart>
											</ResponsiveContainer>
										</VuroxBroadListItems>
										<VuroxBroadListItems>
											<ListHeading>
												<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> 3 Recent Reviews</p>
											</ListHeading>
											<VuroxListContainer>
												<VuroxRatingBlock author='Aurther Canon' image='/image/user.png' time='1 hr' rating='4.7' reviewText='Nice services' />
												<VuroxRatingBlock author='Socrates Canon' image='/image/user.png' time='1 hr' rating='4.8' reviewText='Tells you where your visitors originated such as search engines' />
												<VuroxRatingBlock author='Canon doyle' image='/image/user.png' time='1 hr' rating='4.2' reviewText='Tells you  such as search engines, social social' />
												<VuroxRatingBlock author='Canon doyle' image='/image/user.png' time='1 hr' rating='4.2' reviewText='Tells you where your social networks' />
												
											</VuroxListContainer>
										</VuroxBroadListItems>
										<VuroxBroadListItems>
											<ListHeading>
												<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> Activity Stream</p>
											</ListHeading>
											<VuroxListContainer>
												<li>
													<i className="ti-shopping-cart-full bg-green-6"></i>
													<span className="fright">23min</span>
													<div className="vurox-list-desc">
														<p className="vurox-text-sizes">Order Verification</p>
														<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
													</div>
												</li>
												<li>
													<i className="ti-check bg-magenta-6"></i>
													<span className="fright">2h</span>
													<div className="vurox-list-desc">
														<p className="vurox-text-sizes">Order Completed</p>
														<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
													</div>
												</li>
												<li>
													<i className="ti-shopping-cart-full bg-cyan-6"></i>
													<span className="fright">1wk</span>
													<div className="vurox-list-desc">
														<p className="vurox-text-sizes">Verification waiting</p>
														<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
													</div>
												</li>
												<li>
													<i className="ti-timer bg-yellow-6"></i>
													<span className="fright">1h</span>
													<div className="vurox-list-desc">
														<p className="vurox-text-sizes">Overdue shipment</p>
														<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
													</div>
												</li>
												<li>
													<i className="ti-shopping-cart-full bg-volcano-6"></i>
													<span className="fright">2mon</span>
													<div className="vurox-list-desc">
														<p className="vurox-text-sizes">Order Verification</p>
														<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
													</div>
												</li>
												<li>
													<i className="ti-timer bg-blue-6"></i>
													<span className="fright">1h</span>
													<div className="vurox-list-desc">
														<p className="vurox-text-sizes">Overdue shipment</p>
														<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
													</div>
												</li>
											</VuroxListContainer>
										</VuroxBroadListItems>
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