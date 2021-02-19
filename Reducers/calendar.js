import {COMPANYCALENDAR} from '../Actions/constants'

const dataDate = new Date()
const dateAdd = (date, interval, units, sethour='', setmin='') => {
      if(!(date instanceof Date))
            return undefined;
      var x = new Date(date); //don't change original date
      const checkRollover = () => 
            { if(x.getDate() != date.getDate()) x.setDate(0);};
                  switch(String(interval).toLowerCase()) {
                  case 'year'   :
                        x.setFullYear(x.getFullYear() + units); checkRollover();  
                        break;
                  case 'quarter':  x.setMonth(x.getMonth() + 3*units); checkRollover();  break;
                  case 'month'  :  x.setMonth(x.getMonth() + units); checkRollover();  break;
                  case 'week'   :  x.setDate(x.getDate() + 7*units);  break;
                  case 'day'    :  x.setDate(x.getDate() + units);  break;
                  case 'hour'   :  x.setTime(x.getTime() + units*3600000);  break;
                  case 'minute' :  x.setTime(x.getTime() + units*60000);  break;
                  case 'second' :  x.setTime(x.getTime() + units*1000);  break;
                  default       :  x = undefined;  break;
            }
            if( sethour !== '' || setmin !== '' ){
                  x.setHours(sethour, setmin)
            }
      return x.toISOString();
}
const initialState = {
	orderCalendar: [
      	{ 
      		title: "UI kit, sektch", 
      		start: dateAdd( dataDate, 'day', 1, 9, 0 ), //09: 00AM
                  end: dateAdd( dataDate, 'day', 1, 10, 0 ), // 10:00AM
      		data: {
      			clientName: 'nick stone',
      			orderStatus: 'accepted',
			    imgUrl: '/image/orders/',
      			taskImg: 'task-1.png',
      			clientImg: 'client-1.png',
      			color: '#c770f9',
      		} 
      	},
      	{ 
      		title: 'Association of ifatr', 
      		start: dateAdd( dataDate, 'hour', 1, 10, 0),
		      end:   dateAdd( dataDate, 'hour', 1, 11, 0),
      		data: {
				clientName:    'robert martin',
      			orderStatus:   'accepted',
		            imgUrl:        '/image/orders/',
      			taskImg:       'task-1.png',
      			clientImg:     'client-1.png',
      			color:         '#56e6a7',
      		} 
      	},
      	{ 
      		title: "React App", 
      		start: dateAdd( dataDate, 'day', 2, 14, 0 ),
                  end: dateAdd( dataDate, 'day', 2, 15, 0 ),
      		data: {
				clientName: 'zeit nextjs',
      			orderStatus: 'ready to delivery',
			      imgUrl: '/image/orders/',
      			taskImg: 'task-1.png',
      			clientImg: 'client-1.png',
      			color: '#f9f471',
      		} 
      	},
      	{ 
      		title: "Foundation trr.", 
      		start: dateAdd( dataDate, 'day', 3, 9, 0 ),
                  end: dateAdd( dataDate, 'day', 3, 11, 0 ),
      		data: {
				clientName: 'amiah burton',
      			orderStatus: 'ready to delivery',
			    imgUrl: '/image/orders/',
      			taskImg: 'task-1.png',
      			clientImg: 'client-1.png',
      			color: '#e66c56',
      		} 
      	},
            { 
                  title: "UI kit, sektch", 
                  start: dateAdd( dataDate, 'day', 5, 9, 0 ),
                  end: dateAdd( dataDate, 'day', 5, 11, 0 ),
                  data: {
                        clientName: 'amiah burton',
                        orderStatus: 'ready to delivery',
                        imgUrl: '/image/orders/',
                        taskImg: 'task-1.png',
                        clientImg: 'client-1.png',
                        color: '#56e6a7',
                  } 
            },
            { 
                  title: "Dribble", 
                  start: dateAdd( dataDate, 'week', 1, 9, 0 ),
                  end: dateAdd( dataDate, 'week', 1, 11, 0 ),
                  data: {
                        clientName: 'nur ahmad',
                        orderStatus: 'ready to delivery',
                        imgUrl: '/image/orders/',
                        taskImg: 'task-1.png',
                        clientImg: 'client-1.png',
                        color: '#c770f9',
                  } 
            },
	]
}

export const vuroxCompanyCalendar = ( state = initialState, action ) => {
	return state
}