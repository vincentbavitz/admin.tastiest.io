
import { useContext } from 'react'
import { Typography, Divider, Space, Dropdown, Menu, Button, Tooltip, Row, Col, Upload, message } from 'antd'
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
const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
const BeforeUpload = ( file ) => {
    if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
    }
    return file.type === 'image/png';
}
const breadcrumb = () => {
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
                                    <small>Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.</small>
                                </Paragraph>
                                <Divider dashed/>
                                <Title level={4}>Upload basic</Title>
                                <Paragraph>Basic usage.</Paragraph>
                                    <Upload>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                    <br />
                                    <br />
                                    {/* <Space>
                                        <Dropdown overlay={menu} placement="topLeft">
                                            <Button>topLeft</Button>
                                        </Dropdown>
                                        <Dropdown overlay={menu} placement="topCenter">
                                            <Button>topCenter</Button>
                                        </Dropdown>
                                        <Dropdown overlay={menu} placement="topRight">
                                            <Button>topRight</Button>
                                        </Dropdown>
                                    </Space> */}
                                <Divider dashed/>
                                <Title level={4}>Drag And Drop Upload</Title>
                                <br />
                                <Space>
                                    <Dragger>
                                        <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                        </p>
                                    </Dragger> 
                                </Space>
                            </VuroxComponentsContainer>
                        </Col>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                                <Title level={4}>Upload PNG Only</Title>
                                <br />
                                <Upload beforeUpload={BeforeUpload}>
                                    <Button icon={<UploadOutlined />}>Upload png only</Button>
                                </Upload>
                                <br />
                                <br />
                                <Title level={4}>Upload Wall Tiles</Title>
                                <br />

                                <Upload
                                    listType="picture-card">
                                        Upload Images
                                </Upload>
                            </VuroxComponentsContainer>
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
    </React.Fragment>
  )
}
export default breadcrumb