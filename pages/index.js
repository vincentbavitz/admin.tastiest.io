import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import { VuroxComponentsContainer} from 'Components/layout' 
import { VuroxChartsBoxHead, processDualChartsData, VuroxCustomTick, vuroxDarkToolTipStyles } from 'Components/charts'
import { VuroxProgressbar } from 'Components/progressbar' 

import VuroxWorldMaps from 'Components/MapCharts'

import HeaderDark from 'Templates/HeaderDark';
import Summery from 'Templates/Summery';
import AdminSummeryBox from 'Templates/AdminSummeryBox';
import Sidebar from 'Templates/HeaderSidebar';
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
} from 'Components/layout'

import { Row, Col } from 'antd'
import { vuroxContext } from '../context'

import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, linearGradient, PieChart, Pie, Sector
} from 'recharts';

class index extends React.Component {
	static contextType = vuroxContext
	
	constructor(props) {
		super(props);
		
		this.state = {
			selectedTab: '',
			doubleBarChartData: [],
			doubleBarChartData2: [],
		}
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
		const {menuState} = this.context

		const toggleClass = menuState ? 'menu-closed' : 'menu-open'
		return (
			<React.Fragment>
				<HeaderLayout className="sticky-top">
					<HeaderDark />
				</HeaderLayout>
				<VuroxLayout>
					<VuroxSidebar width={240} className={`sidebar-container ${toggleClass}`} >
						<Sidebar className={toggleClass} />
					</VuroxSidebar>
					<ContentLayout width='100%' className='vurox-scroll-y p-3'>
								<Summery />
								<AdminSummeryBox />
								<Row gutter={{xs:4, sm:6, md:8}}>
									<Col md={14}>
										<VuroxComponentsContainer className="p-4 rounded-top">
											<Row>
												<Col md={14}>
													<h5>Website Audience Metric</h5>
													<p className="vurox-text-sizes mb-3">
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
											<Row>
												<Col md={8} xs={24}>	
													<ResponsiveContainer className="d-inline-block align-bottom" width='30%' height={60}>
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
													<ResponsiveContainer className="d-inline-block align-bottom" width='30%' height={60}>
														<BarChart data={this.props.company.orders[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
															<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
															<Bar dataKey="value" fill="#50bc5e" barSize={2} barGap ={2} />
														</BarChart>
													</ResponsiveContainer>
													<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">{this.props.company.orders[0].dailyTotal} <small className="vurox-text-sizes"> New Users</small></h4>
													
												</Col>
												<Col md={8} xs={24}>
													<ResponsiveContainer className="d-inline-block align-bottom" width='30%' height={60}>
														<BarChart data={this.props.company.bounce[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
															<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
															<Bar dataKey="value" fill="#F7614D" barSize={2} barGap ={2} />
														</BarChart>
													</ResponsiveContainer>
													<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">{this.props.company.bounce[0].dailyTotal}% <small className="vurox-text-sizes"> Bounce rate</small></h4>
												</Col>
											</Row>
										</VuroxComponentsContainer>
										<div className="vurox-admin-secondary-bg mt-n2 mb-2 rounded-bottom">
											<Row className="vurox-chart-box-standard-padding">
												<Col md={14}>
													<h5>Revenue Sharing</h5>
													<p className="vurox-text-sizes mb-3">
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
												<AreaChart data={this.state.doubleBarChartData}
													margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
													<defs>
														<linearGradient id="pp1" x1="0" y1="0" x2="0" y2="1">
															<stop offset="5%" stopColor="#9738e2" stopOpacity={0.4}/>
															<stop offset="95%" stopColor="#9738e2" stopOpacity={0}/>
														</linearGradient>
														<linearGradient id="pp2" x1="0" y1="0" x2="0" y2="1">
															<stop offset="5%" stopColor="#60cadf" stopOpacity={0.7}/>
															<stop offset="95%" stopColor="#60cadf" stopOpacity={0}/>
														</linearGradient>
														</defs>
													<YAxis stroke="#ccc" tickLine={false} axisLine={false} />
													<CartesianGrid horizontal={false} strokeDasharray="1 1" opacity={0} />
													<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
													<Area type="monotone" dataKey="visitors" stroke="#735bcf" fill='url(#pp1)' fillOpacity={1} strokeWidth={2} dot={false} />
													<Area type="monotone" dataKey="profit" stroke="#60cadf" fill='url(#pp2)' fillOpacity={1} strokeWidth={2} dot={false}/>
												</AreaChart>
											</ResponsiveContainer>	
										</div>
									</Col>
									<Col md={10}>
										<Row>
											<Col sm={24}>
												<VuroxComponentsContainer className='mb-2 rounded'>
													<VuroxChartsBoxHead>
														<Row>
															<Col md={14}>
																<h4 className="mb-1"><span className='small'>Total Quantity</span></h4>
																<p className="vurox-text-sizes">
																	Session within date range
																</p>
															</Col>
															<Col md={6}>
																<h3 className="mb-1">23.33%</h3>
																<p className="vurox-color-green-6"><i className="ti-stats-up vurox-color-green-6"></i> +1.34% </p>
															</Col>
															<Col md={4}>
																<div className="vurox-charts-icon fright mt-3"><i className="ti-plug"></i></div>
															</Col>
														</Row>
													</VuroxChartsBoxHead>
													<ResponsiveContainer width='100%' height={115} >	
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
										</Row>
										<VuroxComponentsContainer className="rounded">	 
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
								<VuroxComponentsContainer className="rounded">	
									<VuroxChartsBoxHead>
										<Row className="mb-2">
											<Col md={10}>
												<h5>Map Charts</h5>
												<p className="vurox-text-sizes mb-3">Total Number of session within date range users</p>
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
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)