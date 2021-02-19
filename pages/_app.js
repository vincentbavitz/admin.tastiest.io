import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store'
import { VuroxContextProvider } from '../context'

import 'Styles/styles.less'
import 'antd/dist/antd.less'


class VuroxApp extends App{
	state = {
		width : ''
	}
	static async getInitialProps( { Component, ctx } ){
		let pageProps = {}
		if( Component.getInitialProps ){
			pageProps = await Component.getInitialProps(ctx)
		}
		return { pageProps}
	}
	componentWillMount(){
		const isClient = typeof window === 'object';
		const width = isClient ? window.innerWidth : undefined
		this.setState({ width: width })
	}
	render () {
	    const { Component, pageProps, store } = this.props
	    return(
	        <Provider store={store}>
				<VuroxContextProvider pageWidth={this.state.width}>
					<Component>
						{this.pageProps}
					</Component>
				</VuroxContextProvider>
	        </Provider>
	    )
	}
}

export default withRedux(configureStore)(VuroxApp)
