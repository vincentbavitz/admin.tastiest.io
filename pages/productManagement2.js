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
	VuroxChartsBoxHead, 
	VuroxChartsLegend, 
	processDualChartsData,
	VuroxCustomTick,
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

import VuroxWorldMaps from 'Components/MapCharts'
import HeaderDark from 'Templates/HeaderDark';
import Summery from 'Templates/Summery';
import { vuroxContext } from '../context'
import Sidebar from 'Templates/HeaderSidebar';

import { Row, Col } from 'antd'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CartesianAxis, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Label, AreaChart, Area, PieChart, Pie
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
						<Row gutter={{xs:4, sm: 6, md: 8}}>
							<Col md={18}>
								<VuroxComponentsContainer>	
									<VuroxChartsBoxHead>
										<Row className="mb-4">
											<Col md={10}>
												<h5>Map Charts</h5>
												<p className="vurox-text-sizes">Total Number of session within date range users</p>
											</Col>
											<Col md={14}>
												<ul className='vurox-horizontal-links underlined fright mb-3'>
													<li><Link href=""><a className='active'>All</a></Link></li>
													<li><Link href=""><a>Today</a></Link></li>
													<li><Link href=""><a>Weekly</a></Link></li>
													<li><Link href=""><a>Monthly</a></Link></li>
												</ul>
											</Col>
										</Row>
										<Row>
											<Col md={10}>
												<table className="table table-borderless color-white vurox-admin-table vurox-admin-table-borderless vurox-table-dark">
													<tbody>
														<tr>
															<td>1.</td>
															<td>Montana</td>
															<td>120</td>
															<td className="vurox-color-red">-3.2%</td>
														</tr>
														<tr>
															<td>2.</td>
															<td>Seoul</td>
															<td>454</td>
															<td className="vurox-color-green">+5.44%</td>
														</tr>
														<tr>
															<td>3.</td>
															<td>Kiev</td>
															<td>233</td>
															<td className="vurox-color-green">+1.64%</td>
														</tr>
														<tr>
															<td>4.</td>
															<td>Moscow</td>
															<td>565</td>
															<td className="vurox-color-red">-2.64%</td>
														</tr>
														<tr>
															<td>5.</td>
															<td>Saint pittsburg</td>
															<td>787</td>
															<td className="vurox-color-red">-1.45%</td>
														</tr>
														<tr>
															<td>6.</td>
															<td>Beijing</td>
															<td>588</td>
															<td className="vurox-color-green">+1.64%</td>
														</tr>
														<tr>
															<td>7.</td>
															<td>London</td>
															<td>342</td>
															<td className="vurox-color-green">+1.64%</td>
														</tr>
														<tr>
															<td>8.</td>
															<td>Sanghai</td>
															<td>898</td>
															<td className="vurox-color-green">+3.5%</td>
														</tr>
														<tr>
															<td>9.</td>
															<td>Chicago</td>
															<td>600</td>
															<td className="vurox-color-green">+2.60%</td>
														</tr>
														<tr>
															<td>10.</td>
															<td>Bangaluru</td>
															<td>344</td>
															<td className="vurox-color-green">+1.64%</td>
														</tr>
													</tbody>
												</table>
											</Col>
											<Col md={14} className='position-public'>
												<VuroxWorldMaps height={350} width='100%' />
											</Col>
										</Row>
									</VuroxChartsBoxHead>
								</VuroxComponentsContainer>	
								<Row gutter={{xs:4, sm:6, md:8}} className="mt-2">
									<Col md={12} xs={24}>
										<VuroxComponentsContainer className='vurox-bg-light-violet'>
											<VuroxChartsBoxHead>
												<h5>Aquisition</h5>
												<p className="vurox-text-sizes">Tells you where your visitors originates from</p>
												<Row className='pt-4 pr-2 pl-2'>
													<Col md={12} xs={12}>
														
														<ResponsiveContainer className="bg-green-6 align-top d-inline-block mr-2 mt-1" width='30%' height={35}>
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
														<ResponsiveContainer className="bg-red-5 align-top d-inline-block mr-2 mt-1" width='30%' height={35}>
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
												<h5>Growth rate</h5>
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
								</Row>
								<Row gutter={{xs:4, sm:6, md:8}} className="mt-2">
									<Col md={12}>
										<VuroxComponentsContainer className='pb-1'>
											<VuroxChartsBoxHead>
												<Row>
													<Col md={12}>
														<h5>Sales Analytics</h5>
														<p className='vurox-text-sizes'>The total number of sales within date range</p>
													</Col>
													<Col md={12}>
														<div className='text-right'>
															<VuroxChartsLegend fill='#00c150' text='Order Value' type='horizontal' shape='circle' />
															<VuroxChartsLegend fill='#2f60e2' text='Total Download' type='horizontal' shape='circle' />
														</div>
													</Col>
												</Row>
											</VuroxChartsBoxHead>
											<ResponsiveContainer width='100%' height={400}>
												<RadarChart data={this.state.doubleBarChartData2}>
													<defs>
														<filter id="f3" x="0" y="0" width="200%" height="200%">
																<feOffset result="offOut" in="SourceAlpha" dx="10" dy="20" />
																<feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
																<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
														</filter>
													</defs>
													<PolarGrid opacity={0.4}  gridType="circle" />
													<PolarAngleAxis dataKey="date" axisLineType="circle" tick={VuroxCustomTick} />
													<Tooltip cursor={false} contentStyle={vuroxDarkToolTipStyles} />
													<Radar name="visitors" dataKey="visitors" stroke="#00c150" fill="#00c150" fillOpacity={1} />
													<Radar name="profit" dataKey="profit" stroke="#2f60e2" fill="#2f60e2" fillOpacity={0.7} />
												</RadarChart>
											</ResponsiveContainer>
										</VuroxComponentsContainer>
									</Col>
									<Col md={12}>
										<Row gutter={{xs:4, sm:6, md:8}}>
											<Col md={24}>
												<VuroxComponentsContainer>	 
													<VuroxChartsBoxHead>
														<div className="pb-3">
															<h5>Sales Analytics</h5>
															<p className="vurox-text-sizes">Audiences to which the user belong the currecnt users</p>
														</div>
														<Row>
															<Col md={10}>
																<ResponsiveContainer width='100%' height={150}>
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
											<Col md={24} xs={24} className='mb-2'>
												<VuroxComponentsContainer fillbg='#1E5EE9' className='constant-white mt-2'>
													<VuroxChartsBoxHead>
														<Row>
															<Col md={12}>
																<VuroxChartsLegend fill='#f9be49' text='Order Value' type='horizontal' shape='rectangle' />
																<VuroxChartsLegend fill='#4f80e9' text='Total Download' type='horizontal' shape='rectangle' />
															</Col>
														</Row>
													</VuroxChartsBoxHead>
													<ResponsiveContainer width='100%' height={160} >
														<BarChart data={this.state.doubleBarChartData2} margin={{top: 0, right: 15, left: -15, bottom: 5}}>
															<XAxis dataKey="date" stroke="#ccc" tickLine={false} axisLine={false} />
															<YAxis stroke="#ccc" tickLine={false} axisLine={false} />
															<CartesianGrid vertical={false} strokeDasharray="1 1" opacity={0.6} />
															<Tooltip cursor={false}  contentStyle={vuroxDarkToolTipStyles} />
															<Bar dataKey="visitors" fill="#f9be49" barSize={20} />
															<Bar dataKey="profit" fill="#4f80e9" barSize={20}/>
														</BarChart>
													</ResponsiveContainer>
												</VuroxComponentsContainer>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
							<Col md={6}>
								<VuroxComponentsContainer className=''>
									
									<VuroxBroadListItems className="constant-white" fills='rgb(30, 94, 233)'>
										<ListHeading>
											<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> Activity Stream</p>
										</ListHeading>
										<VuroxListContainer>
											<li>
												<i className="ti-shopping-cart-full bg-cyan-6 rounded shadow-sm"></i>
												<span className="fright">1h</span>
												<div className="vurox-list-desc">
													<p className="vurox-text-sizes">Order Verification</p>
													<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
												</div>
											</li>
											<li>
												<i className="ti-check bg-cyan-6 rounded shadow-sm"></i>
												<span className="fright">3h</span>
												<div className="vurox-list-desc">
													<p className="vurox-text-sizes">Order Completed</p>
													<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
												</div>
											</li>
											<li>
												<i className="ti-check bg-cyan-6 rounded shadow-sm"></i>
												<span className="fright">3h</span>
												<div className="vurox-list-desc">
													<p className="vurox-text-sizes">Order Completed</p>
													<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
												</div>
											</li>
											<li>
												<i className="ti-timer bg-cyan-6 rounded shadow-sm"></i>
												<span className="fright">1w</span>
												<div className="vurox-list-desc">
													<p className="vurox-text-sizes">Overdue shipment</p>
													<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
												</div>
											</li>
											<li>
												<i className="ti-shopping-cart-full bg-cyan-6 rounded shadow-sm"></i>
												<span className="fright">1w</span>
												<div className="vurox-list-desc">
													<p className="vurox-text-sizes">Order Verification</p>
													<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
												</div>
											</li>
										</VuroxListContainer>
									</VuroxBroadListItems>
									<VuroxBroadListItems>
										<ListHeading>
											<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> 3 Recent Reviews</p>
										</ListHeading>
										<VuroxListContainer>
											<VuroxRatingBlock author='Canon doyle' image='/image/user.png' time='2hours' rating='4.2' reviewText='Tells you where your visitors search engines, social' />
											<VuroxRatingBlock author='Canon doyle' image='/image/user.png' time='2hours' rating='4.2' reviewText='Tells you where your visitors search engines, social' />
											<VuroxRatingBlock author='Canon doyle' image='/image/user.png' time='3hours' rating='4.2' reviewText='Tells you where your visitors ' className='pb-3' />
											
										</VuroxListContainer>
									</VuroxBroadListItems>
								</VuroxComponentsContainer>
								<VuroxComponentsContainer className='mt-2'>
									<VuroxChartsBoxHead className='pb-1'>
										<Row>
											<Col md={12}>
												<h5>All Sessions</h5>
												<p className="vurox-text-sizes mb-3">
													It is the period a user is website page or app
												</p>
											</Col>
											<Col md={12}>
												<h5 className="mb-0 fright">23.33% <small className="vurox-sm-stats"><i className="ti-stats-up"></i></small></h5>
												<p className="vurox-sm-stats vurox-text-sizes fright">Bounce rate</p>
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