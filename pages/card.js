import {useContext} from 'react'
import { Typography, Divider, Space, Avatar, Card, Row, Col } from 'antd'
const {Meta} = Card
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
                  <Title level={2}>Card</Title>
                  <Paragraph className="lead">
                    <small>Cards provide a flexible and extensible content container with multiple variants and options.</small>
                  </Paragraph>
                  <Divider dashed/>
                  <Title level={4}>Simple Cards</Title>
                  <Space direction="vertical">
                    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                  </Space>
                  <Divider dashed/>
                  <p>Only card content</p>
                  <Card style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>

                </VuroxComponentsContainer>
              </Col>
              <Col md={12}>
                <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                  <p>Card with thumbnail</p>
                  <Space>
                  <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://i.ibb.co/xgTyGxd/man-wearing-red-sweatshirt-and-black-pants-leaning-on-the-845434.jpg" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                  </Space>
                  <Divider dashed/>
                  <p>Vertically stacked card</p>
                  <Card style={{ width: 300, marginTop: 16 }}>
                    <Meta
                        avatar={
                        <Avatar src="https://i.ibb.co/DGc2ppM/images.png" />
                        }
                        title="Card title"
                        description="This is the description"
                    />
                    </Card>
                </VuroxComponentsContainer>
              </Col>
            </Row>
        </ContentLayout>
      </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb