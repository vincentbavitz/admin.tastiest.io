import React from 'react'
import {connect} from 'react-redux'

import { 
	VuroxBreadcrumbs
} from 'Components/breadcrumbs'

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
} from 'Components/layout'
import { vuroxContext } from '../context'

import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import { VuroxMail, VuroxMailToolbar, VuroxMailContainer, VuroxChatLists, VuroxChatListOptions, VuroxMailCategories} from 'Templates/mail';


import { Row, Col, Space } from 'antd'


class index extends React.Component {
	static contextType = vuroxContext
	constructor(props) {
	 	super(props);
	 	this.state = {
            items: '',
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this)
	}
	onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

	componentDidMount(){
		this.setState({ items: this.props.mail })
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
						<Col md={24}>
							<Row className="vurox-admin-content-top-section">
								<Col md={4}>
									<VuroxBreadcrumbs pagename='Email' links={[ [ 'Home', '/', ''], ['Application','/application',], [ 'Email', '/mail', 'active'] ]} />
								</Col>
								<Col md={20} className="text-right">
									<Space size="middle">
										<div className='d-none d-block-md'>
											<ul className="vurox-horizontal-links vurox-standard-ul pt-2 mb-1">
												<li><a href=""><i className="ti-save"></i> save report</a></li>
												<li><a href=""><i className="ti-book"></i> Export to PDF</a></li>
												<li><a href=""><i className="ti-email"></i> Send to email</a></li>
											</ul>
										</div>
										<div className="align-right">
											<button type="button" className="float-none float-sm-right mr-2 btn white bg-magenta-5 btn-md rounded hover-color my-3 my-sm-0 d-block">Export data <i className='ti-export'></i></button>
										</div>
									</Space>
								</Col>
							</Row>
							<Row gutter={{md:8}}>
								<Col md={4}>
									<VuroxMailCategories />
								</Col>
								<Col md={16}>
									<VuroxMail className="vurox-admin-primary-bg">
										<VuroxMailToolbar items={this.state.items} onChangePage={this.onChangePage} />
										<VuroxMailContainer mails={this.state.pageOfItems} />
									</VuroxMail>
								</Col>
								<Col md={4}>
									<div className='vurox-list-items vurox-admin-primary-bg'>
										<ul>
											{

												this.props.message.map( (elem, i) => {
													const msg = elem.msg[elem.msg.length - 1]
													return(<li>
														<VuroxChatLists chatlink='/823746234' displayPic={elem.propic} name={elem.display_name} message={msg.message} />
													</li>)
												})
											}
										</ul>
									</div>
								</Col>
							</Row>
						</Col>
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)