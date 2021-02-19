import React from 'react';
import Head from 'next/head'
export default class Header extends React.Component {
	render() {
		return (
			<Head>
				<title>Vurox ReactJS Admin template</title>
				<link href="/style/bootstrap.css" rel="stylesheet" />
				<link href="/style/icon-fonts.css" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,600&display=swap" rel="stylesheet" />
			</Head>
		);
	}
}
