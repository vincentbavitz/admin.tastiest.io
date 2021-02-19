import { combineReducers } from 'redux'
import { vuroxUsers } from './users'
import { vuroxCompanyInfo } from './company'
import { vuroxCompanyCalendar } from './calendar'
import { vuroxMail } from './mail'
import { vuroxChatMessages } from './message'

const rootReducer = combineReducers({
	users: vuroxUsers,
	company: vuroxCompanyInfo,
	calendar: vuroxCompanyCalendar,
	mail: vuroxMail,
	message: vuroxChatMessages,
})
export default rootReducer;