
import { useContext } from 'react'
import { Typography, Divider, Space, notification, Button, Row, Col, Upload } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const {Title, Paragraph} = Typography
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from '../context'
const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement : 'bottomLeft'
    });
};
const openNotificationWithIcon = type => {
    notification[type]({
        message: 'Notification Title',
        placement : 'bottomRight',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });

};
const openNotificationWithPlacement = placement => {
    notification.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
};
const notofication = () => {
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
                <ContentLayout width='100%' className='p-1 vurox-scroll-y'>
                    <Row>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                                <Title level={2}>Upload</Title>
                                <Paragraph className="lead">
                                    <small>To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:</small>
                                </Paragraph>
                                <Divider dashed/>
                                <Title level={4}>Basic Notifications</Title>
                                <Paragraph>Basic usage.</Paragraph>
                                    <Button type="primary" onClick={openNotification}>
                                        Open message
                                    </Button>
                                    <br />
                                    <br />
                                <Divider dashed/>
                                <Title level={4}>Alert Notification</Title>
                                <Space>
                                    <Button type="primary" onClick={() => openNotificationWithIcon('success')}>
                                        success
                                    </Button>
                                    <Button type="primary" onClick={() => openNotificationWithIcon('info')}>
                                        info
                                    </Button>
                                    <Button type="primary" onClick={() => openNotificationWithIcon('warning')}>
                                        warning
                                    </Button>
                                    <Button type="primary" onClick={() => openNotificationWithIcon('error')}>
                                        error
                                    </Button>
                                </Space>
                            </VuroxComponentsContainer>
                        </Col>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                                <Title level={4}>Notification with placement</Title>
                                <br />
                                <Space>
                                <Button type="primary" onClick={() => openNotificationWithPlacement('topLeft')}>
                                    topLeft
                                </Button>
                                <Button type="primary" onClick={() => openNotificationWithPlacement('topRight')}>
                                    topRight
                                </Button>
                                <Button type="primary" onClick={() => openNotificationWithPlacement('bottomLeft')}>
                                    bottomLeft
                                </Button>
                                <Button type="primary" onClick={() => openNotificationWithPlacement('bottomRight')}>
                                    bottomRight
                                </Button>
                                </Space>

                            </VuroxComponentsContainer>
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
    </React.Fragment>
  )
}
export default notofication