import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'

import { 
	VuroxBreadcrumbs
} from 'Components/breadcrumbs'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from '../context'
import VuroxBroadCalendar, { VuroxShortCalendar } from 'Components/calendar'
import VuroxDropdown, { DropdownItems, DropdownItem, DropdownItemSeperator, DropdownBigItems, DropdownItemsHead } from 'Components/dropdown'
import VuroxWorldMaps from 'Components/MapCharts'
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';


import { Row, Col, Space } from 'antd'


class index extends React.Component {
	static contextType = vuroxContext
	constructor(props) {
	 	super(props);
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
					<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
						<Row gutter={{xs:4, sm:6, md:8}}>
								<Col md={24}>
									<Row className="vurox-admin-content-top-section">
										<Col md={4}>
											<VuroxBreadcrumbs pagename='Email' links={[ [ 'Home', '/', ''], ['Application','/application',], [ 'Email', '/mail', 'active'] ]} />
										</Col>
										<Col md={20} className="text-right">
											<Space size="middle">
												<div>
													<ul className="vurox-horizontal-links vurox-standard-ul pt-2 mb-1">
														<li><a href=""><i className="ti-save"></i> save report</a></li>
														<li><a href=""><i className="ti-book"></i> Export to PDF</a></li>
														<li><a href=""><i className="ti-email"></i> Send to email</a></li>
													</ul>
												</div>
												<div className="align-right">
													<button type="button" className="float-none float-sm-right mr-2 btn white bg-magenta-5 btn-md rounded hover-color my-3 my-sm-0">Export data <i className='ti-export'></i></button>
												</div>
											</Space>
										</Col>
									</Row>
									<Row gutter={{xs:4, sm:6, md:8}}>
										<Col md={16}>
											<VuroxComponentsContainer className='p-4'>
												<VuroxBroadCalendar orders={this.props.calendar.orderCalendar} />
											</VuroxComponentsContainer>
										</Col>
										<Col md={8}>
											<VuroxComponentsContainer className='p-4'>
												<VuroxShortCalendar className='vurox-short-calendar' orders={this.props.calendar.orderCalendar} />
											</VuroxComponentsContainer>
											<VuroxComponentsContainer className='p-3 mt-2'>
												<Row className='px-3 mb-4'>
													<Col className="mr-3">
														<p className='vurox-text-sizes'>Top Countries</p>
													</Col>
													<Col className="text-right">
														<VuroxDropdown position='vurox-dropdown-top-right' >
															<button className='btn btn-xs theme-color'> Monthly <i className='ti-angle-down'></i></button>
															<DropdownItems className='py-1 dropdown-sm'>
																<DropdownItem link='/'>Account</DropdownItem>
																<DropdownItem link='/'>Settings</DropdownItem>
																<DropdownItem link='/'>Logout</DropdownItem>
															</DropdownItems>
														</VuroxDropdown>
													</Col>
												</Row>
												<VuroxWorldMaps height='200' width='100%'  />
											</VuroxComponentsContainer>
										</Col>
									</Row>
								</Col>
							</Row>
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)