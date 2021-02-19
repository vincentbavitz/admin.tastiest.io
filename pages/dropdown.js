
import { useContext } from 'react'
import { Typography, Divider, Space, Dropdown, Menu, Button, Tooltip, Row, Col } from 'antd'
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
                  <Title level={2}>Dropdown</Title>
                  <Paragraph className="lead">
                    <small>When there are more than a few options to choose from, you can wrap them in a Dropdown. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.</small>
                  </Paragraph>
                  <Divider dashed/>
                  <Title level={4}>Dropdown positions</Title>
                  <Paragraph>Basic usage.</Paragraph>
                    <Space>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button>bottomLeft</Button>
                        </Dropdown>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Button>bottomCenter</Button>
                        </Dropdown>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button>bottomRight</Button>
                        </Dropdown>
                    </Space>
                    <br />
                    <br />
                    <Space>
                        <Dropdown overlay={menu} placement="topLeft">
                            <Button>topLeft</Button>
                        </Dropdown>
                        <Dropdown overlay={menu} placement="topCenter">
                            <Button>topCenter</Button>
                        </Dropdown>
                        <Dropdown overlay={menu} placement="topRight">
                            <Button>topRight</Button>
                        </Dropdown>
                    </Space>
                  <Divider dashed/>
                  <Title level={4}>Button with dropdown menu</Title>
                  <br />
                    <Space>
                        <Dropdown.Button overlay={menu}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button overlay={menu} disabled>
                            Dropdown
                        </Dropdown.Button>
                    </Space>
                    <br />
                    <br />
                    <Space>
                        <Dropdown.Button
                            overlay={menu}
                            buttonsRender={([leftButton, rightButton]) => [
                                <Tooltip title="tooltip" key="leftButton">
                                {leftButton}
                                </Tooltip>,
                                React.cloneElement(rightButton, { loading: true }),
                            ]}>
                            With Tooltip
                        </Dropdown.Button>
                        <Dropdown overlay={menu}>
                            <Button>
                                Button <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </VuroxComponentsContainer>
              </Col>
              <Col md={12}>
                <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                  <Title level={4}>Dropdown on a space</Title>
                  <Dropdown overlay={menu} trigger={['contextMenu']}>
                    <div
                        className="site-dropdown-context-menu"
                        style={{
                            textAlign: 'center',
                            height: 200,
                            lineHeight: '200px',
                            backgroundColor: 'rgba(255,255,255,0.05)'
                        }}>
                        Right Click on here
                    </div>
                </Dropdown>
                </VuroxComponentsContainer>
              </Col>
            </Row>
        </ContentLayout>
      </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb