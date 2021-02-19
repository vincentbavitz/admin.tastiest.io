import React from 'react';
import Link from 'next/link'
import Pagination from 'Components/pagination'

export class VuroxMail extends React.Component {
	render() {
		return (
			<div className={ this.props.className + ' vurox-mail-main-contents'}>
				{this.props.children}
			</div>
		);
	}
}

export class VuroxMailContainer extends React.Component {
	render() {
		const emails = this.props.mails
		return (
			<div className="vurox-mail-email-list">
					{
						emails.map((elem, i) => (
							<ul>
								<li key={elem.ID}>
									<Link href='/mail/[id]' as={`/mail/${elem.ID}`}>
										<a className={elem.isSeen == 0 ? 'email-unread' : ''}>
											<div className="row">
												<div className="col-md-3">
													<span className="mail-checkbox"><input type="checkbox" className="vurox-check vurox-include-allchecked" /></span>
													<span className="mail-star"><i className="ti-star"></i></span>
													<span className="mail-company">{elem.name}</span>
												</div>
												<div className="col-md-8 overflow-hidden mail-title-content-main">
													<span className="mail-title-content"><span>{elem.subject} -</span> <span>{elem.desc}</span></span>
												</div>
												<div className="col-md-1">
													<span>{elem.time}</span>
												</div>
											</div>
										</a>
									</Link>
								</li>
							</ul>
						) )
					}					
			</div>
		);
	}
}

		
export class VuroxMailCategories extends React.Component {
	render() {
		return (
			<div className="vurox-mail-links vurox-admin-primary-bg rounded d-none d-sm-block">
				<ul>
					<li className="vurox-mail-main-link"><a href="">Compose</a></li>
					<li><a href=""><i className="ti-email"></i> Inbox</a></li>
					<li><a href=""><i className="ti-star"></i> Starred</a></li>
					<li><a href=""><i className="ti-time"></i> Snoozed</a></li>
					<li><a href=""><i className="ti-bolt"></i> Important</a></li>
					<li><a href=""><i className="ti-location-arrow"></i> Sent</a></li>
					<li><a href=""><i className="ti-smallcap"></i> Drafts</a></li>
					<li><a href=""><i className="ti-trash"></i> Trash</a></li>
					<li className="p-2 vurox-partial-heading"><a>Labels</a></li>
				</ul>
			</div>
		);
	}
}
export class VuroxChatListOptions extends React.Component {
	render() {
		return (
			<div className="vurox-mail-email-list">
				<span className="vurox-options  vurox-options-left"><i className="ti-more-alt"></i></span>
				<ul className="vurox-dropdown-list vurox-dropdown-list-left">
					<li><a href="">Search</a></li>
					<li><a href="">Mute Notification</a></li>
					<li><a href="">Block contact</a></li>
					<li><a href="">Add shortcut</a></li>
				</ul>
			</div>
		);
	}
}
export class VuroxChatLists extends React.Component {
	render() {
		return (
			<Link href={this.props.chatlink}>
				<a>
					<img src={this.props.displayPic} alt="" />
					<div className="chatlist-content">
						<p>{this.props.name}</p>
						<p>{this.props.message}</p>
					</div>
				</a>
			</Link>
		)
	}
}



export class VuroxMailToolbar extends React.Component {
	render() {
		return (
			<div className="vurox-mail-toolbar-top row">
				<div className="col-md-5">
					<div className="vurox-mail-toolbar-icon">
						<ul>
							<li className="mr-3"><input type="checkbox" className="vurox-check mt-2 vurox-check-all" />
							</li>
							<li><a href="" title="Archive"><i className="ti-archive"></i></a></li>
							<li><a href="" title="Report Spam"><i className="ti-info-alt"></i></a></li>
							<li><a href="" title="Mark as unread"><i className="ti-email"></i></a></li>
							<li><a href="" title="Trash"><i className="ti-trash"></i></a></li>
							<li><a href="" title="Snooze"><i className="ti-timer"></i></a></li>
							<li><a href="" title="Tags"><i className="ti-tag rotate-90"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="col-md-7">
					<div className="pagination align-right row">
						<div className="col-md-6">
							
						</div>
						<div className="col-md-6">
							<div className="fright p-1">
								<Pagination items={this.props.items} onChangePage={this.props.onChangePage}  />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
