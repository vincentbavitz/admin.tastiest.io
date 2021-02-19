
import { useContext } from 'react'
import { Typography, Divider, Space, Dropdown, List, Button, Tooltip, Row, Col, Avatar } from 'antd'
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
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  const metadata = [
    {
      title: 'Vurox Template Title 1',
    },
    {
      title: 'Vurox Template Title 2',
    },
    {
      title: 'Vurox Template Title 3',
    },
    {
      title: 'Vurox Template Title 4',
    },
    {
      title: 'Vurox Template Title 4',
    },
    {
      title: 'Vurox Template Title 4',
    },
    {
      title: 'Vurox Template Title 4',
    },
  ];
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
                <ContentLayout width='100%' className='p-3 vurox-scroll-y'>
                    <Row>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-3'>
                            <Title level={3}>List Items</Title>
                            <Paragraph className="lead">
                                <small>A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.</small>
                            </Paragraph>
                            <Divider dashed/>
                            <Title level={4}>Simple List</Title>
                                <List
                                    size="default"
                                    header={<div>Header</div>}
                                    footer={<div>Footer</div>}
                                    bordered
                                    dataSource={data}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                                <br />
                                <br />
                            </VuroxComponentsContainer>
                        </Col>
                        <Col md={12}>
                            <VuroxComponentsContainer className='p-4 ml-2'>
                            <Title level={4}>Detailed List Items</Title>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={metadata}
                                    renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<Avatar src="https://i.ibb.co/DGc2ppM/images.png" />}
                                        title={<a href="https://vurox.vercel.app">{item.title}</a>}
                                        description="Vurox is a react admin templated powered by Next.js by vercel and ant design"
                                        />
                                    </List.Item>
                                    )}
                                />
                            </VuroxComponentsContainer>
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb