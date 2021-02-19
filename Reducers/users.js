import { USERS } from '../Actions/constants'
const initialState = {
	loggedin: false,
	username: 'Muaz',
	id: '',
	token: '',
	email: '',
	lastloggedin: '',
	users: '',
	salesVolume: 12987323,
	currency: '$',
	verified: false
}

export const vuroxUsers = ( state = initialState, action ) => {
	switch( action.type ){
		case 'USER_LOGGEDIN' : {
			return{
				...state,
				loggedin: action.payload
			}
		}
		case 'USER_EMAIL' : {
			return{
				...state,
				email: action.payload
			}
		}
		case 'USERS_FETCHED' : {
			return{
				...state,
				users: action.payload
			}
		}
		case 'USER_NAME' : {
			return{
				...state,
				username: action.payload
			}
		}
		case 'USER_ID' : {
			return{
				...state,
				id: action.payload
			}
		}
		case 'EXCHANGE_BUY' : {
			return{
				...state,
				tradings:{
					...state.tradings,
					buy:{
						data: action.payload
					}
				}
			}
		}
		case 'DATA_RESET' : {
			return{
				...state,
				loggedin: initialState.loggedin,
				username: initialState.username,
				id: initialState.id,
				token: initialState.token,
				email: initialState.email,
			}
		}
	}
	return state
}