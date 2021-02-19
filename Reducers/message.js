const messages = [
	{
		ID: 923874,
		connection_id: 12312,
		connected_to: 'Muaz',
		username: 'Ben Williams',
		display_name: 'Ben',
		propic: '/image/propic/1.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'hi',
				reply: 'Hello',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'we are going to fishing tomorrow',
				reply: 'When?',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: 'sharp at 11am',
				reply: 'where?'
			},

		]
	},
	{
		ID: 923875,
		connection_id: 12313,
		connected_to: 'Muaz',
		username: 'Leo Natsume',
		display_name: 'Leo',
		propic: '/image/propic/2.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Hello',
				reply: 'Hello',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'What we can do to help you today?',
				reply: 'Talk to an agent',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: 'To connect you with the right team please let me know what this is about?',
				reply: 'I have a meeting now. Talk you later.'
			},

		]
	},
	{
		ID: 923876,
		connection_id: 12314,
		connected_to: 'Muaz',
		username: 'Caroline',
		display_name: 'Caroline',
		propic: '/image/propic/3.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Hi Caroline!',
				reply: 'Hello',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'What are you doing today?',
				reply: 'We can meet this afternoon if you want.',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: ' I am here to assist you today.',
				reply: 'How can I help you?'
			},

		]
	},
	{
		ID: 923877,
		connection_id: 12315,
		connected_to: 'Muaz',
		username: 'Alex Burch',
		display_name: 'Alex',
		propic: '/image/propic/4.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Guys! Do you want to go out today?',
				reply: 'Hi! Yes, we could go visit the town.',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Great! See you at 2pm on the bridge!',
				reply: 'I am going to be late.',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: 'I am going to be late',
				reply: 'where?'
			},

		]
	},
	{
		ID: 923878,
		connection_id: 12316,
		connected_to: 'Muaz',
		username: 'Andrew Walter',
		display_name: 'Andrew',
		propic: '/image/propic/5.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Hello',
				reply: 'Hi! How are you?',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Fine Brother',
				reply: 'Great! ',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: 'Hi! How are you?',
				reply: 'where?'
			},

		]
	},
	{
		ID: 923879,
		connection_id: 12317,
		connected_to: 'Muaz',
		username: 'Zhenya Rynzhuk',
		display_name: 'Zhenya',
		propic: '/image/propic/2.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'The button size could be a bit smaller.',
				reply: 'Yes, I agree.',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Maybe reducing the padding.',
				reply: 'I have a meeting now but i will work on this again after lunch.',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: 'I will have new updates later this afternoon',
				reply: 'Thanks!'
			},

		]
	},
	{
		ID: 923880,
		connection_id: 12318,
		connected_to: 'Muaz',
		username: 'Josh Tyers',
		display_name: 'Josh',
		propic: '/image/propic/3.jpg',
		msg: [
			{
				status: 1, // 1 for read and 0 for unread
				message: 'Hi! Josh',
				reply: 'Hello',
			},
			{
				status: 1, // 1 for read and 0 for unread
				message: 'I have news on sales',
				reply: 'Good to hear the news!',
			},
			{
				status: 0, // 1 for read and 0 for unread
				message: 'When can we talk about?',
				reply: 'Do you have any report with this information?'
			},

		]
	}
]


export const vuroxChatMessages = ( state = messages, action ) => {
	return state;
}