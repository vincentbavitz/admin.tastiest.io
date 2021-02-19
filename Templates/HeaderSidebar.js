import React, { useContext } from 'react';
import {  VerticalNavHeading, Navitem } from 'Components/nav'
import * as Bsicon from 'react-bootstrap-icons'
import VuroxFormSearch from 'Components/search'
const Sidebar = (props) => {

	return (
			<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>
				<ul>
					<VerticalNavHeading>Dashboards</VerticalNavHeading>
					
					<Navitem link='/' text='Main' icon={<Bsicon.House />} />
					<Navitem link='/webAnalytics' icon={<Bsicon.GraphUp />} text='Web Analytics'/>
					<Navitem link='/webAnalytics2' icon={<Bsicon.GraphUp />} text='Web Analytics 2'/>
					<Navitem link='/productManagement' icon={<Bsicon.BookmarkCheck />} text='Product Management'/>
					<Navitem link='/productManagement2' icon={<Bsicon.BoundingBoxCircles />} text='Product Management 2'/>
					<Navitem link='/salesMonitoring' text='Sales monitoring' icon={<Bsicon.PieChart />}/>
						
					<VerticalNavHeading>Application</VerticalNavHeading>
					<Navitem link='/orders' text='Orders' icon={<Bsicon.Bag />} badge="badge badge-pill bg-green-5" badgeText='4' />
					<Navitem link='/mail' text='Email' icon={<Bsicon.Envelope />} badge="badge badge-pill bg-cyan-5" badgeText='14+' />
					<VerticalNavHeading>Components</VerticalNavHeading>
					<Navitem link='/alert' text='Alert' icon={<Bsicon.ExclamationCircle />} />
					<Navitem link='/badge' text='Badge' icon={<Bsicon.Fullscreen />} />
					<Navitem link='/breadcrumb' text='Breadcrumbs' icon={<Bsicon.FilterLeft />} badge="badge badge-pill bg-cyan-5" badgeText='14+' />
					<Navitem link='/buttons' text='Buttons' icon={<Bsicon.ViewList />} />
					<Navitem link='/card' text='Cards' icon={<Bsicon.FilesAlt />} />
					<Navitem link='/carousel' text='Carousel' icon={<Bsicon.Textarea />} />
					<Navitem link='/collapse' text='Collapse' icon={<Bsicon.Collection />} />
					<Navitem link='/comments' text='Comments' icon={<Bsicon.ChatDots />} />
					<Navitem link='/dropdown' text='Dropdown' icon={<Bsicon.Filter />} />
					<Navitem link='/forms' text='Forms' icon={<Bsicon.CardText />} badge="badge badge-pill bg-blue-5" badgeText='13+' />
					<Navitem link='/listitems' text='List Items' icon={<Bsicon.ListCheck />} />
					<Navitem link='/modal' text='Modals' icon={<Bsicon.Window />} />
					<Navitem link='/upload' text='Upload' icon={<Bsicon.CloudUpload />} />
					<Navitem link='/notification' text='Notification' icon={<Bsicon.InfoCircle />} />
					
					<VuroxFormSearch border='rounded' className='ml-4 d-block d-sm-none bg-grey-6' />
				</ul>
			</div>
	);
}
export default Sidebar
