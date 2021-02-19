
import { useContext, useState } from 'react'
import { Typography, Divider, Space, Modal, Button, Row, Col } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';

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

const breadcrumb = () => {
  const { menuState } = useContext(vuroxContext)
  const [ visible, setVisible ] = useState(false)
  const [ modal1Visible, setModal1Visible ] = useState(false)
  const [ modal2Visible, setModal2Visible ] = useState(false)
  const handleOk = () => {
      setVisible(false)
  }
  const handleCancel = () => {
      setVisible(false)
  }
  const showModal = () => {
      setVisible(true)
  }
  const setmodal1Visible = ( val ) => {
    setModal1Visible( val );
  }

  const setmodal2Visible = ( val ) => {
    setModal2Visible( val );
  }

  function info() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }
  
  function success() {
    Modal.success({
      content: 'some messages...some messages...',
    });
  }
  
  function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }
  
  function warning() {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  }
  
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
                    <Row>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-3'>
                            <Title level={3}>Modals</Title>
                            <Paragraph className="lead">
                                <small>A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.</small>
                            </Paragraph>
                            <Divider dashed/>
                            <Title level={4}>Default Modals</Title>
                            <Button type="primary" onClick={showModal}>
                                Open Modal
                            </Button>
                            <Modal
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <p>When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information</p>
                            </Modal>
                                <br />
                                <br />
                                <Button type="primary" onClick={() => setModal1Visible(true)}>
                                    Display a modal dialog at 20px to Top
                                </Button>
                                <Modal
                                    title="20px to Top"
                                    style={{ top: 20 }}
                                    visible={modal1Visible}
                                    onOk={() => setmodal1Visible(false)}
                                    onCancel={() => setmodal1Visible(false)}
                                >
                                    <p>some contents...</p>
                                    <p>some contents...</p>
                                    <p>some contents...</p>
                                </Modal>
                                <br />
                                <br/>
                                <Button type="primary" onClick={() => setModal2Visible(true)}>
                                    Vertically centered modal dialog
                                </Button>
                                <Modal
                                    title="Vertically centered modal dialog"
                                    centered
                                    visible={modal2Visible}
                                    onOk={() => setmodal2Visible(false)}
                                    onCancel={() => setmodal2Visible(false)}
                                >
                                    <p>some contents...</p>
                                    <p>some contents...</p>
                                    <p>some contents...</p>
                                </Modal>
                            </VuroxComponentsContainer>
                        </Col>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-4 ml-2'>
                            <Title level={4}>information Modal Dialogue</Title>
                            <Space>
                                <Button onClick={info}>Info</Button>
                                <Button onClick={success}>Success</Button>
                                <Button onClick={error}>Error</Button>
                                <Button onClick={warning}>Warning</Button>
                            </Space>
                            </VuroxComponentsContainer>
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb