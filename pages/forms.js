import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link' 

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

import {   Form,
  Input,
  Button,
  Radio,
  Select,
  Checkbox,
  Typography,
  Space, 
  Row, 
  Col
} from 'antd';
import { QuestionCircleOutlined, UserOutlined, MailOutlined, LockOutlined, FacebookFilled, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
const { Search } = Input
const { Option } = Select;


const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

class index extends React.Component {
	state = {
        formLayout : 'horizontal'
    }
    onFormLayoutChange = ({ layout }) => {
        this.setState({ formLayout: layout });
    };
	static contextType = vuroxContext
	render() {
        const formItemLayout =
        this.state.formLayout === 'horizontal'
            ? {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            }
            : null;
    
        const buttonItemLayout =
        this.state.formLayout === 'horizontal'
            ? {
                wrapperCol: { span: 14, offset: 4 },
            }
            : null;
        const { menuState } = this.context
        const toggleClass = menuState ? 'menu-closed' : 'menu-open'
		const layouts = {
		  	wrapperCol: { offset: 5, span: 16 },
		};
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
                                <VuroxComponentsContainer className='p-4 ml-2 mt-3'>
                                <Typography.Title level={3}>Sign Up</Typography.Title>
                                <Form
                                    name="user_signup"
                                    className="login-section"
                                    >
                                    <Form.Item
                                        name="name"
                                        aucomplete="false"
                                        rules={[{ required: true, message: 'Please input your Name!' }]}
                                    >
                                        <Input size="large"  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your Full Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name="username"
                                        aucomplete="false"
                                        rules={[{ required: true, message: 'Please input your Username!' }]}
                                    >
                                        <Input size="large"  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item 
                                        name="email" 
                                        rules={[{ 
                                            required: true, 
                                            message: 'Please provide an vaild email', 
                                            type: 'email'
                                        }]}>
                                        <Input 
                                            size="large"
                                            type="email"                             
                                            prefix={<MailOutlined />} 
                                            placeholder="Email"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your Password!' }]}>
                                        <Input
                                            size="large"   
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>

                                    <Space>
                                        <Form.Item>
                                            <Button size="large" type="primary" htmlType="submit" className="login-form-button" >
                                            Sign up
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button size="large" className="login-form-button">
                                            <Link href="/signin">Sign in</Link>
                                            </Button>
                                        </Form.Item>
                                    </Space>
                                </Form>
                                <Space size={6} direction="horizontal">
                                    <Button className="social-buttons btn-social-facebook" icon={<FacebookFilled size={20} />} size="large"> Facebook</Button>
                                    <Button className="social-buttons btn-social-google" icon={<GoogleOutlined size={20} />} size="large"> Google</Button>
                                    <Button className="social-buttons btn-social-github" icon={<GithubOutlined size={20} />} size="large"> Github</Button>
                                </Space>											
                                </VuroxComponentsContainer>
                            </Col>
                            <Col md={12}>
                            <VuroxComponentsContainer className='p-4 ml-2 mt-3'>
                                <Typography.Title level={3}>Form Layouts</Typography.Title>
                                <br />
                                <Form
                                        {...formItemLayout}
                                        layout={this.state.formLayout}
                                        initialValues={{ layout: this.state.formLayout }}
                                        onValuesChange={this.onFormLayoutChange}
                                    >
                                        <Form.Item label="Form Layout" name="layout">
                                        <Radio.Group value={this.state.formLayout}>
                                            <Radio.Button value="horizontal">Horizontal</Radio.Button>
                                            <Radio.Button value="vertical">Vertical</Radio.Button>
                                            <Radio.Button value="inline">Inline</Radio.Button>
                                        </Radio.Group>
                                        </Form.Item>
                                        <Form.Item label="Field A">
                                        <Input placeholder="input placeholder" />
                                        </Form.Item>
                                        <Form.Item label="Field B">
                                        <Input placeholder="input placeholder" />
                                        </Form.Item>
                                        <Form.Item {...buttonItemLayout}>
                                        <Button type="primary">Submit</Button>
                                        </Form.Item>
                                    </Form>
                                </VuroxComponentsContainer>
                            </Col>
                        </Row>
					</ContentLayout>
                </VuroxLayout>
		    </React.Fragment>
		);
	}
}
export default connect(state=>state)(index)