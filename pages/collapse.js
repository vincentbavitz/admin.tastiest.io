
import {useContext} from 'react'
import { Typography, Divider, Space, Collapse, Row, Col } from 'antd'
const { Panel } = Collapse
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
                  <Title level={2}>Collapse/Collection</Title>
                  <Paragraph className="lead">
                    <small>Toggle the visibility of content across your project with a few classes and our JavaScript plugins</small>
                  </Paragraph>
                  <Divider dashed/>
                  <Title level={4}>Simple Collapse</Title>
                  <Paragraph>By default, any number of panels can be expanded at a time. The first panel is expanded in this example.</Paragraph>
                    <Collapse defaultActiveKey={['2']}>
                        <Panel header="This is panel header 1" key="1">
                            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" disabled>
                            <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                        </Panel>
                    </Collapse>
                  <Divider dashed/>
                  <Title level={4}>Accordion</Title>
                  <Paragraph>In accordion mode, only one panel can be expanded at a time.</Paragraph>
                  <Collapse accordion>
                    <Panel header="This is panel header 1" key="1">
                        <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                </Collapse>
                </VuroxComponentsContainer>
              </Col>
              <Col md={12}>
                <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                  <Title level={4}>Custom borderless accordion</Title>
                  <Paragraph>Customize the background, border, margin styles and icon for each panel.</Paragraph>
                  <Collapse accordion bordered={false}>
                    <Panel header="This is panel header 1" key="1" className="vurox-borderless-panel">
                        <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2" className="vurox-borderless-panel">
                        <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3" className="vurox-borderless-panel">
                        <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                </Collapse>
                    <Divider dashed />
                  <Title level={4}>Some iconless</Title>
                  <Paragraph>You can hide the arrow icon by passing showArrow={false} to CollapsePanel component.</Paragraph>
                  <Collapse defaultActiveKey={['1']}>
                    <Panel header="This is panel header with arrow icon" key="1">
                    <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                    <Panel showArrow={false} header="This is panel header with no arrow icon" key="2">
                    <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                    </Panel>
                </Collapse>
                </VuroxComponentsContainer>
              </Col>
            </Row>
        </ContentLayout>
      </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb