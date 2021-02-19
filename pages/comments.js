import React, { useState, useContext } from 'react'
import { Typography, Divider, Space, Comment, Tooltip, Avatar, Input, Form, Button, List, Row, Col } from 'antd'
const {Title, Paragraph} = Typography
const {TextArea} = Input
import moment from 'moment'
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

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src="https://i.ibb.co/DGc2ppM/images.png"
        alt="Han Solo"
      />
    }
    content={
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);
const breadcrumb = () => {
  const [comments, setComment] = useState([]) 
  const [commentText, setCommentText] = useState('') 
  const [submitting, setSubmitting] = useState(false) 
  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );

  const Editor = ({onSubmit}) => (
    <div>
      <Form.Item>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );


  const handleSubmit = () => {
    if (!commentText) {
      return;
    }

    setSubmitting(true)

      setTimeout(() => {
        setSubmitting(false),
        setComment(
          [{
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{commentText}</p>,
            datetime: moment().fromNow(),
          },
          ...comments]
        ),
        setCommentText('')
        
      }, 1000);
  };
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
                  <Title level={2}>Comments</Title>
                  <Paragraph className="lead">
                    <small>Comments can be used to enable discussions on an entity such as a page, blog post, issue or other.</small>
                  </Paragraph>
                  <Divider dashed/>
                  <Title level={4}>Comments</Title>
                  <Paragraph>By default, any number of panels can be expanded at a time. The first panel is expanded in this example.</Paragraph>
                  <Comment
                    // actions={actions}
                    author={<a>Han Solo</a>}
                    avatar={
                      <Avatar
                        src="https://i.ibb.co/DGc2ppM/images.png"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully
                        and efficiently.
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                  <Divider dashed/>
                  <Title level={4}>Multi level Comments</Title>
                  <ExampleComment>
                    <ExampleComment>
                      <ExampleComment />
                      <ExampleComment />
                    </ExampleComment>
                  </ExampleComment>
                </VuroxComponentsContainer>
              </Col>
              <Col md={12}>
                <VuroxComponentsContainer className='p-4 ml-2 mt-2'>
                  <Title level={4}>Comment Form</Title>
                  <Paragraph>Customize the background, border, margin styles and icon for each panel.</Paragraph>

                   <div>
                      {comments.length > 0 && <CommentList comments={comments} />}
                      <Comment
                        avatar={
                          <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                          />
                        }
                        content={
                          <Editor onSubmit={handleSubmit} />
                        }
                      />
                    </div> 
                    
                  
                </VuroxComponentsContainer>
              </Col>
            </Row>
        </ContentLayout>
      </VuroxLayout>
		</React.Fragment>
  )
}
export default breadcrumb