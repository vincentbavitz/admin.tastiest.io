import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import hexToRgba from 'hex-to-rgba';
import moment from 'moment'
import $ from 'jquery'


let CalendarComponent
function FullCalendar(props) {
  	const [calendarLoaded, setCalendarLoaded] = useState(false)
	useEffect( () => {
		CalendarComponent = dynamic({
			modules: () => ({
				calendar: import('@fullcalendar/react'),
				dayGridPlugin: import('@fullcalendar/daygrid'),
				timeGridPlugin: import('@fullcalendar/timegrid'),
				interactionPlugin: import('@fullcalendar/interaction')
			}),
		  	render: (props, { calendar: Calendar, ...plugins }) => (
		    	<Calendar {...props} plugins={Object.values(plugins)} ref={props.myRef} />
		  	),
		  	ssr: false
		})
		setCalendarLoaded(true)
	})
  	let showCalendar = (props) => {
    	if ( !calendarLoaded ) return <div>Loading ...</div>
    	return (
      		<CalendarComponent {...props} />
    	)
  	}
  	return (
    	<div className='vurox-daygrid-calendar'>
      		{showCalendar(props)}
		</div>
  	)
}
const EventDetail = ({...props}) => (
	<div>{props.children}</div>
)

const EventContent = ({event}) => {
	const colorwop = hexToRgba( event.extendedProps.data.color, 0.2 )

	return (
		<EventDetail>
		  	<div className="event-with-details" style={{backgroundColor: colorwop ,borderBottom: '2px solid ' + event.extendedProps.data.color }}>
		  		<div className="single-event-heading">
					<img src={event.extendedProps.data.imgUrl + event.extendedProps.data.taskImg} />
			  		<p>{event.title}</p>
		  		</div>
		  		<div className="single-event-content">
		  			<p>TO</p>
					<img src={event.extendedProps.data.imgUrl + event.extendedProps.data.clientImg} />
					<h5>{event.extendedProps.data.clientName}</h5>
					<span style={{backgroundColor: colorwop ,color: event.extendedProps.data.color}}>{event.extendedProps.data.orderStatus}</span>
		  		</div>
		  	</div>
		</EventDetail>
	)
}
const EventContentSmall = ({event}) => {
	const colorwop = hexToRgba( event.extendedProps.data.color, 1 )

	return (
		<EventDetail>
		  	<div className='vurox-sm-events'>
	  			<span style={{backgroundColor: colorwop ,color: event.extendedProps.data.color}}></span>
		  	</div>
		</EventDetail>
	)
}

const Event = ({event, el}) => {
	ReactDOM.render(<EventContent event={event} />, el)
	return el
}

const vuroxBigEvents = ({event, el, view}) => {
	const eventDiv = document.createElement('div')
	const classes = Array.from(el.classList)
	eventDiv.classList.add(...classes)

	ReactDOM.render(<EventContent event={event} />, eventDiv)

	return eventDiv
}
const vuroxSmEvents = ({event, el, view}) => {
	const eventDiv = document.createElement('div')
	const classes = Array.from(el.classList)
	eventDiv.classList.add(...classes)

	ReactDOM.render(<EventContentSmall event={event} />, eventDiv)

	return eventDiv
}

const vuroxRemakeCalendar = ( info ) => {
	if ( 'dayGridMonth' !== info.view.type ) {
	    return;
	}
	let a = moment( info.event.start, 'YYYY-MM-DD' ),
        b = moment( info.event.end, 'YYYY-MM-DD' ),
        duration = moment.duration( b.diff( a ) ),
        row = info.el.closest( '.fc-row' ),
        d = a.clone(), i, c;
   	let title = info.event.title;
	for ( i = 0; i <= duration._data.days; i++ ) {
	    if ( 0 === 1 ) {
	      c = a;
	    } else {
	      d.add( 1, 'days' );
	      c = d;
	    }

	    $(row).find( '.fc-day-top[data-date="' + c.format( 'YYYY-MM-DD' ) + '"]' )
	    	.addClass('less-left')
			.append(
			'<a href="#" className="fc-event-dot" onclick="return false;" ' +
			  'style="background-color: ' + info.event.extendedProps.data.color + ';" ' +
			  'title="' + title + '"></a>'
			);
		info.el.remove();
	}
}

export default class VuroxBroadCalendar extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<FullCalendar 
					defaultView='timeGridFourDay' 
					header={{ 
						left: 'title prev,next today',
				        right: 'timeGridFourDay,timeGridWeek' 
					}} 
					plugins={[ 'dayGridPlugin', 'timeGridPlugin', 'interactionPlugin' ]}
					events={this.props.orders}
					eventRender={vuroxBigEvents}
					views= {{
						    timeGridFourDay: {
						      type: 'timeGrid',
						      duration: { days: 4 },
						      buttonText: 'day'
						    }
						}}
					allDaySlot={false}
					minTime="08:00"
					maxTime="17:00"
				/>
			</div>
		);
	}
}

export class VuroxShortCalendar extends React.Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={this.props.className}>
				<FullCalendar 
					defaultView='dayGridMonth' 
					header={{ 
						left: 'title',
				        right: 'prev,next' 
					}} 
					plugins={[ 'dayGridPlugin', 'timeGridPlugin', 'interactionPlugin' ]}
					events={this.props.orders}
					views= {{
						    timeGridFourDay: {
						      type: 'timeGrid',
						      duration: { days: 4 },
						      buttonText: 'day'
						    }
						}}
					allDaySlot={false}
					minTime="08:00"
					maxTime="17:00"
					height={350}
					eventPositioned={vuroxRemakeCalendar}
				/>
			</div>
		);
	}
}
