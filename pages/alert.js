import {useContext} from 'react'
import { Alert, Space, Divider, Typography } from 'antd';
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import TextLoop from 'react-text-loop'
import { Row, Col } from 'antd'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from '../context'
const alert = () => {
	const { menuState } = useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'
    return(
        <React.Fragment>
			<HeaderLayout className="sticky-top">
				<HeaderDark />
			</HeaderLayout>
			<VuroxLayout>
				<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
					<Sidebar className={toggleClass} />
				</VuroxSidebar>
				<ContentLayout width='100%' className='p-1 vurox-scroll-y'>
					<Row>
						<Col md={12}>
							<VuroxComponentsContainer className='p-4 ml-2 mt-2'>
								<Typography.Title level={2}>Alerts</Typography.Title>
								<Typography.Paragraph className='lead'>
									When you need to show alert messages to users.When you need a persistent static container which is closable by user actions.

								</Typography.Paragraph>

								<Divider dashed></Divider>											
								<Typography.Title level={4}>
									Demostrating Alerts
								</Typography.Title>
								<br />
								<Space direction="vertical">
									<Alert message="Success" description="This is an alert with success" type="success" closable />											
									<Alert message="Warning Text" description="This is an alert with warning.You can show it in the popup also this is just text" type="warning" closable />
									<Alert message="Error Text" description="Error Description ErrorDescription Error Description Error Description" type="error" />
									<Alert message="Info Text" type="info" closeText="Close Now" />
								</Space>

								<Divider dashed />
								<Typography.Title level={4}>Alerts with text loop</Typography.Title>											
								<p>
									Alert box with text loop messages.received from react text loop
								</p>
								<Alert
									banner
									message={
									<TextLoop mask>
										<div>Notice message one</div>
										<div>Notice message two</div>
										<div>Notice message three</div>
										<div>Notice message four</div>
									</TextLoop>
									}
								/>
							</VuroxComponentsContainer>
						</Col>
						<Col md={12}>
							<VuroxComponentsContainer className='p-4 ml-2 mt-2'>
							
								<Typography.Title level={4}>Demostrating Alerts with icons</Typography.Title>	
								<br />										
								<Space direction="vertical">
									<Alert message="Success Tips" type="success" showIcon />
									<Alert message="Informational Notes" type="info" showIcon />
									<Alert message="Warning" type="warning" showIcon closable />
									<Alert message="Error" type="error" showIcon />
									<Alert
									message="Success Tips"
									description="Detailed description and advice about successful copywriting."
									type="success"
									showIcon
									/>
									<Alert
									message="Informational Notes"
									description="Additional description and information about copywriting."
									type="info"
									showIcon
									/>
									<Alert
									message="Warning"
									description="This is a warning notice about copywriting."
									type="warning"
									showIcon
									closable
									/>
									<Alert
									message="Error"
									description="This is an error message about copywriting.message about copywriting."
									type="error"
									showIcon
									/>
								</Space>
							</VuroxComponentsContainer>
						</Col>
					</Row>
				</ContentLayout>
			</VuroxLayout>
		</React.Fragment>
    )
} 
export default alert