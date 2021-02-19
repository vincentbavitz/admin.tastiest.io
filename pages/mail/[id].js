import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React , { useContext } from 'react';
import {
	VuroxMail,
	VuroxMailContainer,
	VuroxMailCategories,
	VuroxChatListOptions,
	VuroxChatLists,
	VuroxMailToolbar,
} from 'Templates/mail';

import { VuroxBreadcrumbs } from 'Components/breadcrumbs'

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from '../../context'
import VuroxFormSearch from 'Components/search'
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import { Row, Col, Space } from 'antd'


const Mail = () => {

	const router = useRouter();
	const id = router.query.id
	const mails = useSelector( state => state.mail )
	const mail = mails.filter( (obj) => ( obj.ID == id ) )[0]
	const { menuState } = useContext(vuroxContext)
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
					<Row gutter={{xs:4,sm:6, md:8}}>
						<Col md={6} sm={6}>
							<VuroxMailCategories />
						</Col>
						<Col md={18} sm={18}>
							<VuroxMail className="vurox-admin-primary-bg rounded">
								<VuroxMailToolbar />
								<h4>{mail.subject}</h4>
								<p>From: {mail.from} <span className='fright'>{mail.time}</span></p>

								<div dangerouslySetInnerHTML={ {__html:mail.desc}} />
							</VuroxMail>
						</Col>
						<Col md={6} lg={4}>
							<div className='vurox-list-items vurox-admin-primary-bg rounded'>
								<ul>
									<li>
										<VuroxChatLists chatlink='/823746234' displayPic='/image/propic/1.jpg' name='John Doe' message='Hello ther how are you?I am fine' />
									</li>
									<li>
										<VuroxChatLists chatlink='/82374645234' displayPic='/image/propic/2.jpg' name='Cristiano Doe' message='Hello ther how are you?I am fine' />
									</li>
									<li>
										<VuroxChatLists chatlink='/82374645234' displayPic='/image/propic/3.jpg' name='Aamra Networks' message='Hello ther how are you?I am fine' />
									</li>
									<li>
										<VuroxChatLists chatlink='/82374645234' displayPic='/image/propic/4.jpg' name='Cristiano Doe' message='Hello ther how are you?I am fine' />
									</li>
									<li>
										<VuroxChatLists chatlink='/82374645234' displayPic='/image/propic/1.jpg' name='Cristiano Doe' message='Hello ther how are you?I am fine' />
									</li>
								</ul>
							</div>
						</Col>
					</Row>
			</ContentLayout>
			</VuroxLayout>
		</React.Fragment>
	);

}
export default Mail