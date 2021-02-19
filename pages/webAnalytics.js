import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux'

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
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CartesianAxis, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Label
} from 'recharts';


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
					<ContentLayout width='100%' className='vurox-scroll-y p-3'>
						<Summery />
						<Row gutter={{xs:4, sm:6, md:8}}>
							<Col md={12}>
								<VuroxComponentsContainer className="rounded mb-2">
									<VuroxChartsBoxHead>
										<Row>
											<Col md={13}>
												<h5>Order And downloads</h5>
												<p className="vurox-text-sizes mb-2">Total number of session within the date range</p>
											</Col>
											<Col md={11} xs={24} className='mb-2'>
												<Row>
													<Col md={12} xs={12}>
														<p className="vurox-text-sizes"><b>Order values</b></p>
														<h4 className="vurox-fw-300">$354,000 <small><i className=""></i></small></h4>		
													</Col>
													<Col md={12} xs={12}>
														<p className="vurox-text-sizes"><b>Total Donwloads</b></p>
														<h4 className="vurox-fw-300">$354,00</h4>	
													</Col>
												</Row>
											</Col>
										</Row>
										<Row>
											<Col md={12}>
												<ul className='vurox-horizontal-links boxed float-left mb-2'>
													<li><Link href=""><a className='active'>All</a></Link></li>
													<li><Link href=""><a>Today</a></Link></li>
													<li><Link href=""><a>Weekly</a></Link></li>
													<li><Link href=""><a>Monthly</a></Link></li>
												</ul>
											</Col>
											<Col md={12} className='ml--8'>
												<VuroxChartsLegend fill='#7B4DFF' text='Order Value' type='horizontal' shape='rectangle' />
												<VuroxChartsLegend fill='#F7614E' text='Total Download' type='horizontal' shape='rectangle' />
											</Col>
										</Row>
									</VuroxChartsBoxHead>
									<ResponsiveContainer width='100%' height={308} >
										<BarChart data={this.state.doubleBarChartData} margin={{top: 0, right: 15, left: -15, bottom: 5}}>
											<XAxis dataKey="date" stroke="#ccc" tickLine={false} axisLine={false} />
											<YAxis stroke="#ccc" tickLine={false} axisLine={false} />
											<CartesianGrid vertical={false} strokeDasharray="1 1" opacity={0.2} />
											<Tooltip cursor={false}  contentStyle={vuroxDarkToolTipStyles} />
											<Bar dataKey="visitors" fill="#7B4DFF" barSize={10} />
											<Bar dataKey="profit" fill="#F7614E" barSize={10}/>
										</BarChart>
									</ResponsiveContainer>
								</VuroxComponentsContainer>
							</Col>
							<Col md={12}>
								<VuroxComponentsContainer fillbg='#1E5EE9' className='constant-white rounded'>
									<VuroxChartsBoxHead>
										<Row>
											<Col md={12} className='mb-4'>
												<h5>Sales Report</h5>
												<p className="vurox-text-sizes">Total number of session within the date range</p>
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
											<Col md={12}>
												<VuroxChartsLegend fill='#f9be49' text='Order Value' type='horizontal' shape='rectangle' />
												<VuroxChartsLegend fill='#4f80e9' text='Total Download' type='horizontal' shape='rectangle' />
											</Col>
										</Row>
									</VuroxChartsBoxHead>
									<ResponsiveContainer width='100%' height={295} >
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
						<Row gutter={{xs:4, sm:6, md:8}} className="mt-2">
							<Col md={16}>
								<VuroxComponentsContainer className='rounded mb-2'>
									<VuroxTableDark>
										<VuroxAdvancedTableHeading className='constant-white' bgimg='//image/bg-map.png' fill='#1E5EE9'>
											<Row>
												<Col md={8}>
													<h5>Your Top Countries</h5>
													<p className="vurox-text-sizes">Audiences to which the user belong</p>
												</Col>
												<Col md={16}>
													<Row>
														<Col md={8} xs={24}>
															<div className="br-1-w align-right">
																<p className="vurox-text-sizes">My funds</p>
																<h4 className="vurox-fw-300">$209384234</h4>
															</div>
														</Col>
														<Col md={8} xs={24}>										
															<div className="br-1-w align-right">
																<p className="vurox-text-sizes">Earnings</p>
																<h4 className="vurox-fw-300">$56456</h4>
															</div>
														</Col>
														<Col md={8} xs={24}>
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
												<ul className='vurox-horizontal-links boxed red-blue'>
													<li><Link href=""><a className='active'>Last 30 days</a></Link></li>
													<li><Link href=""><a>Apr 2020</a></Link></li>
													<li><Link href=""><a>Feb 2020</a></Link></li>
												</ul>
											</Col>
											<Col md={12}>
												<ul className='vurox-horizontal-links boxed fright'>
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
												<tr>
													<th>04 Apr 2020</th>
													<td>#0293844</td>
													<td>Photo collection</td>
													<td>Color lab</td>
													<td className="align-right"><span className="vurox-label vurox-bg-green">Finished</span></td>
													<td className="align-right">$500</td>
													<td className="align-right">$450</td>
												</tr>
											</tbody>
										</table>
									</VuroxTableDark>
								</VuroxComponentsContainer>
							</Col>
							<Col md={8}>
								<VuroxComponentsContainer className="rounded pt-3 mb-2">
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
						</Row>
						<Row gutter={{xs:4, sm:6, md:8}}>
							<Col md={12}>
								<VuroxComponentsContainer className='rounded'>
									<VuroxChartsBoxHead>
										<Row>
											<Col md={12}>
												<h5>Sales Analytics</h5>
												<p className='vurox-text-sizes'>The total number of sales within date range</p>
											</Col>
											<Col md={12}>
												<div className='fright'>
													
												<VuroxChartsLegend fill='#00c150' text='Order Value' type='horizontal' shape='circle' />
												<VuroxChartsLegend fill='#2f60e2' text='Total Download' type='horizontal' shape='circle' />
												</div>
											</Col>
										</Row>
									</VuroxChartsBoxHead>
									<ResponsiveContainer width='100%' height={450}>
										<RadarChart data={this.state.doubleBarChartData2}>
											<defs>
												<filter id="f3" x="0" y="0" width="200%" height="200%">
													<feOffset result="offOut" in="SourceAlpha" dx="10" dy="20" />
													<feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
													<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
												</filter>
											</defs>
											<PolarGrid opacity={0.1}  gridType="circle" />
											<PolarAngleAxis dataKey="date" axisLineType="circle" tick={VuroxCustomTick} />
											<Tooltip cursor={false} contentStyle={vuroxDarkToolTipStyles} />
											<Radar name="visitors" dataKey="visitors" stroke="#00c150" fill="#00c150" fillOpacity={1} />
											<Radar name="profit" dataKey="profit" stroke="#2f60e2" fill="#2f60e2" fillOpacity={0.7} />
										</RadarChart>
									</ResponsiveContainer>
								</VuroxComponentsContainer>
							</Col>
							<Col md={6}>
								<VuroxBroadListItems className='constant-white rounded' fills='rgb(30, 94, 233)'>
									<ListHeading>
										<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> Activity Stream</p>
									</ListHeading>
									<VuroxListContainer>
										<li>
											<i className="ti-shopping-cart-full vurox-bg-green"></i>
											<span className="absolute-right">1hour</span>
											<div className="vurox-list-desc">
												<p className="vurox-text-sizes">Order Verification</p>
												<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
											</div>
										</li>
										<li>
											<i className="ti-check vurox-bg-light-violet"></i>
											<span className="absolute-right">2hour</span>
											<div className="vurox-list-desc">
												<p className="vurox-text-sizes">Order Completed</p>
												<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
											</div>
										</li>
										<li>
											<i className="ti-shopping-cart-full vurox-bg-yellow"></i>
											<span className="absolute-right">3hour</span>
											<div className="vurox-list-desc">
												<p className="vurox-text-sizes">Verification waiting</p>
												<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
											</div>
										</li>
										<li>
											<i className="ti-timer vurox-bg-red"></i>
											<span className="absolute-right">1week</span>
											<div className="vurox-list-desc">
												<p className="vurox-text-sizes">Overdue shipment</p>
												<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
											</div>
										</li>
										<li>
											<i className="ti-shopping-cart-full vurox-bg-light-violet"></i>
											<span className="absolute-right">1months</span>
											<div className="vurox-list-desc">
												<p className="vurox-text-sizes">Order Verification</p>
												<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
											</div>
										</li>
										<li>
											<i className="ti-check vurox-bg-light-violet"></i>
											<span className="absolute-right">1hour</span>
											<div className="vurox-list-desc">
												<p className="vurox-text-sizes">Order Completed</p>
												<p className="vurox-text-sizes vop-7">Product ID: #9823</p>
											</div>
										</li>
									</VuroxListContainer>
								</VuroxBroadListItems>
							</Col>
							<Col md={6}>
								<VuroxBroadListItems className="rounded">
									<ListHeading>
										<p className="vurox-text-sizes"><i className="ti-view-grid color-white mr-1"></i> 3 Recent Reviews</p>
									</ListHeading>
									<VuroxListContainer>
										<VuroxRatingBlock author='Socrates Canon' image='/image/user.png' time='1 hour ago' rating='4.8' reviewText='Tells you where your visitors originated such as search engines' />
										<VuroxRatingBlock author='Canon doyle' image='/image/user.png' time='1 hour ago' rating='4.2' reviewText='Tells you where your visitors originated such as networks' />
										<VuroxRatingBlock author='Epic Boss' image='/image/user.png' time='1 hour ago' rating='4.7' reviewText='I requested customization and they approved' />
									</VuroxListContainer>
								</VuroxBroadListItems>
							</Col>
						</Row>
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)