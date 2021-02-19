
import {useContext} from 'react'
import { Typography, Divider, Space, Carousel, Row, Col } from 'antd'
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
                  <Title level={2}>Carousel</Title>
                  <Paragraph className="lead">
                    <small>A slideshow component for cycling through elements—images or slides of text—like a carousel.</small>
                  </Paragraph>
                  <Divider dashed/>
                  <Title level={4}>Simple Carousel</Title>
                  <Paragraph>Basic usage.</Paragraph>
                    <Carousel>
                        <div>
                            <img src="https://i.ibb.co/XXct0t6/assorted-lipsticks-3373746.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/GvHLPST/abstract-architectural-architecture-art-532561.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/BZ1KbWc/pink-flame-abstract-wallpaper-1684617.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/xgTyGxd/man-wearing-red-sweatshirt-and-black-pants-leaning-on-the-845434.jpg" alt="carousel" />
                        </div>
                    </Carousel>
                  <Divider dashed/>
                  <Title level={4}>Carousel fade</Title>
                  <Carousel effect="fade">
                        <div>
                            <img src="https://i.ibb.co/XXct0t6/assorted-lipsticks-3373746.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/GvHLPST/abstract-architectural-architecture-art-532561.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/BZ1KbWc/pink-flame-abstract-wallpaper-1684617.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/xgTyGxd/man-wearing-red-sweatshirt-and-black-pants-leaning-on-the-845434.jpg" alt="carousel" />
                        </div>
                    </Carousel>

                </VuroxComponentsContainer>
              </Col>
              <Col md={12}>
                <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                  <Title level={4}>Carousel navigation right</Title>
                  <Paragraph>You can give nav a different position by setting atribute [dotPosition] for `Carousel` component</Paragraph>
                  <Carousel effect="fade" dotPosition="right">
                        <div>
                            <img src="https://i.ibb.co/XXct0t6/assorted-lipsticks-3373746.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/GvHLPST/abstract-architectural-architecture-art-532561.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/BZ1KbWc/pink-flame-abstract-wallpaper-1684617.jpg" alt="carousel" />
                        </div>
                        <div>
                            <img src="https://i.ibb.co/xgTyGxd/man-wearing-red-sweatshirt-and-black-pants-leaning-on-the-845434.jpg" alt="carousel" />
                        </div>
                    </Carousel>
                  
                </VuroxComponentsContainer>
              </Col>
            </Row>
        </ContentLayout>
      </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb