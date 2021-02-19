import { Alert, Space, Divider, Typography, Breadcrumb, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import {useContext} from 'react'
const { Title, Paragraph } = Typography
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import TextLoop from 'react-text-loop'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
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
        <a target="_blank" rel="noopener noreferrer" href="http://www.tophivetheme.com/">
          General
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Layout
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tophivetheme.com/">
          Navigation
        </a>
      </Menu.Item>
    </Menu>
  );
const breadcrumb = () => {
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
					<ContentLayout width='100%' className='pl-3 vurox-scroll-y'>
							<Row>
								<Col md={24}>
									<VuroxComponentsContainer className='p-4 m-2'>
										<Title level={2}>Breadcrumbs</Title>											
										<Paragraph className="lead"><small>Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.</small></Paragraph>
                                        <Divider dashed />
										<Paragraph>Simple Breadcrumbs</Paragraph>											
                                        <Breadcrumb>
                                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                            <a href="">Application Center</a>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                            <a href="">Application List</a>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>An Application</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Divider dashed />
										<p>Breadcrumbs with icons</p>											
										<Breadcrumb>
                                            <Breadcrumb.Item href="">
                                                <HomeOutlined />
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item href="">
                                                <UserOutlined />
                                                <span>Application List</span>
                                            </Breadcrumb.Item>
                                                <Breadcrumb.Item>Application</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Divider dashed />
										<p>Breadcrumbs with Customized seperator</p>											
										<Breadcrumb separator=">">
                                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                                            <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                                            <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                                            <Breadcrumb.Item>An Application</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Divider dashed />
										<p>Breadcrumbs with Customized seperator</p>											
										<Breadcrumb>
                      <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
                      <Breadcrumb.Item>
                      <a href="">Component</a>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item overlay={menu}>
                      <a href="">General</a>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Button</Breadcrumb.Item>
                    </Breadcrumb>
									</VuroxComponentsContainer>
								</Col>
                            </Row>
					</ContentLayout>
        </VuroxLayout>
      </React.Fragment>
    )
} 
export default breadcrumb