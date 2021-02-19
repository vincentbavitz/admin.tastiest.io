import React from 'react'
import Link from 'next/link'
export class VuroxBreadcrumbs extends React.Component {
	render() {
		return (
			<div className="vurox-breadcrumbs">
				<h4>{this.props.pagename}</h4>
				<ul className="vurox-breadcrumb-list">
					{
						this.props.links.map( (elem) => <li><Link href={elem[1]}><a className={elem[2]}>{elem[0]}</a></Link></li> )
					}
				</ul>
			</div>
		)
	}
}