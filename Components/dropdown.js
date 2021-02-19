import React, { Component } from 'react';
import ProfileBadge from 'Components/profile'
import Link from 'next/link'
import $ from 'jquery'

  export default class VuroxDropdown extends Component {
    componentDidMount(){
      $('.vurox-dropdown-block button, .vurox-dropdown-block .vurox-dropdown').on('click', (e) => {
        $('.vurox-dropdown-block').removeClass('dropdown-show')
        $(e.currentTarget).parent().addClass('dropdown-show');
      })
      $(document).click(function() {
          $('.vurox-dropdown-block').removeClass('dropdown-show')
      });
      $('.vurox-dropdown-block').click(function(e) {
          e.stopPropagation()
      });
    }
  	render() {
  		return (

  			<div className={ this.props.position + " vurox-dropdown-block " + this.props.className} tabIndex='3'>

  				{this.props.children}
  			</div>				
  		);
  	}
  }


export const DropdownItems = (props) => {
  return (
    <ul style={{width: props.width + 'px'}} className={props.className}>
    	{props.children}
    </ul>
  )
}
export const DropdownItem = (props) => {
  return (
    <li className={props.className}>
    	<Link href={props.link}>
    		<a>
		    	{props.children}
    		</a>
    	</Link>
    </li>
  )
}

export const DropdownItemSeperator = (props) => {
  return (
    <li className="vurox-dropdown-seperator"></li>
  )
}
export const DropdownBigItems = (props) => {
  return (
    <div className="dropdown-big-items d-flex justify-content-start">{props.children}</div>
  )
}

export const DropdownItemsHead = (props) => {
  return (
    <div className={props.color + " dropdown-heading"}>{props.children}</div>
  )
}


