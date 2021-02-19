import {useContext} from 'react'
import { Badge, Space, Divider, Typography } from 'antd';
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import { Row, Col } from 'antd'
import { vuroxContext } from '../context'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
const colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];
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
                                    <Typography.Title level={2}>When to use badges</Typography.Title>											
                                    <Typography.Paragraph className="lead">Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.</Typography.Paragraph>
                                    <Divider dashed />
                                    <Typography.Title level={4}>Demostrating Badges</Typography.Title>
                                    <br />
                                    <Space size={30}>
                                        <Badge count={5}>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                        <Badge count={0} showZero>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                        <Badge count={22}>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                    </Space>

                                    <Divider dashed />
                                    <Typography.Title level={4}>Overflow count</Typography.Title>											
                                    <Typography.Paragraph>
                                        This is helpful when there is infinite amount of number
                                    </Typography.Paragraph>
                                    <br/>
                                    <Space size={30}>
                                        <Badge count={99}>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                        <Badge count={100}>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                        <Badge count={99} overflowCount={10}>
                                            <a href="#" className="head-example" />
                                        </Badge>
                                        <Badge count={1000} overflowCount={999} style={{ backgroundColor: '#52c41a' }} >
                                            <a href="#" className="head-example" />
                                        </Badge>
                                    </Space>
                                    <p className="mb-3 mt-4">
                                        Badge with status
                                    </p>
                                    <div>
                                        <Badge status="success" />
                                        <Badge status="error" />
                                        <Badge status="default" />
                                        <Badge status="processing" />
                                        <Badge status="warning" />
                                        <br />
                                        <Badge status="success" text="Success" />
                                        <br />
                                        <Badge status="error" text="Error" />
                                        <br />
                                        <Badge status="default" text="Default" />
                                        <br />
                                        <Badge status="processing" text="Processing" />
                                        <br />
                                        <Badge status="warning" text="Warning" />
                                    </div>
                                    

                                </VuroxComponentsContainer>
                            </Col>
                            <Col md={12}>
                                <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                                
                                    <p>Stand Alone Badges</p>											
                                    <Space>
                                        <Badge count={25} />
                                        <Badge count={4} className="site-badge-count-4" />
                                        <Badge className="site-badge-count-109" count={109} style={{ backgroundColor: '#52c41a' }} />
                                    </Space>
                                    <p className="my-3">Presets:</p>
                                    <div>
                                    {colors.map(color => (
                                        <div key={color}>
                                        <Badge color={color} text={color} />
                                        </div>
                                    ))}
                                    </div>
                                    <p style={{ margin: '16px 0' }}>Custom:</p>
                                    <div>
                                    <Badge color="#f50" text="#f50" />
                                    <br />
                                    <Badge color="#2db7f5" text="#2db7f5" />
                                    <br />
                                    <Badge color="#87d068" text="#87d068" />
                                    <br />
                                    <Badge color="#108ee9" text="#108ee9" />
                                    </div>
                                </VuroxComponentsContainer>
                            </Col>
                        </Row>
					</ContentLayout>
            </VuroxLayout>
		</React.Fragment>
    )
} 
export default alert