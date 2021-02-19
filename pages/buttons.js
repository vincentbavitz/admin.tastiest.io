import {useContext} from 'react'
import { Space, Divider, Typography, Button, Menu, Tooltip, Dropdown } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import { Row, Col } from 'antd'
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
					<ContentLayout width='100%' className='p-1 vurox-scroll-y'>
							<Row>
								<Col md={12}>
									<VuroxComponentsContainer className='p-4 ml-2 mt-2'>
										<Title level={2}>Buttons</Title>											
										<Paragraph className="lead"><small>Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.</small></Paragraph>
                    <Divider dashed />
										<Paragraph>Simple Buttons</Paragraph>											
                    <Space>
                        <Button type="primary">Primary</Button>
                        <Button>Default</Button>
                        <Button type="dashed">Dashed</Button>
                        <Button type="link">Link</Button>
                    </Space>
                    <Divider dashed />
										<p>Buttons with icons & tooltips</p>											
										<Space>
                        <Tooltip title="search">
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                        </Tooltip>
                        <Button type="primary" shape="circle">
                        A
                        </Button>
                        <Button type="primary" icon={<SearchOutlined />}>
                        Search
                        </Button>
                        <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                        </Tooltip>
                        <Button icon={<SearchOutlined />}>Search</Button>
                        <br />
                    </Space>
                    <Divider dashed />
										<p>Buttons with actions</p>											
                      <Space>
                      <Button type="primary">primary</Button>
                      <Button>secondary</Button>
                      <Dropdown overlay={menu}>
                        <Button>
                          Actions <DownOutlined />
                        </Button>
                      </Dropdown>
                      </Space>											
										
									</VuroxComponentsContainer>
								</Col>
                <Col md={12}>
                  <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                    <p>Danger Buttons</p> 
                    <Space>
                    <Button type="primary" danger>
                      Primary
                    </Button>
                    <Button danger>Default</Button>
                    <Button type="dashed" danger>
                      link
                    </Button>
                    <Button type="link" danger>
                      link
                    </Button>
                    </Space>
                    <Divider dashed />
                    <p>Buttons with their states</p>
                    <Space direction="vertical">
                      <Button type="primary">Primary</Button>
                      <Button type="primary" disabled>
                        Primary(disabled)
                      </Button>
                      <br />
                      <Button>Default</Button>
                      <Button disabled>Default(disabled)</Button>
                      <br />
                      <Button type="dashed">Dashed</Button>
                      <Button type="dashed" disabled>
                        Dashed(disabled)
                      </Button>
                      
                      <br />
                      <Button danger>Danger Default</Button>
                      <Button danger disabled>
                        Danger Default(disabled)
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
export default breadcrumb