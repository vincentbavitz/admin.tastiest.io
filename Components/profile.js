import React, { Component } from 'react';

export default class ProfileBadge extends Component {
	render() {
		const { name, size, shape, version, className, badge, badgeColor, badgeShape } = this.props
		return (
			<div className={ className + ' vurox-profile-badge'}>
				<span className={size + ' ' + shape + ' ' + version + ' vurox-profile-badge'}>{name}</span>
				<p className={ badgeColor + ' ' + badgeShape + ' badge'}>{badge}</p>
			</div>
		);
	}
}
