export enum LocalEndpoint {
  GET_AUTH_TOKEN = '/api/getAuthToken',
  GET_CUSTOMER_EVENTS = '/api/getCustomerEvents',
  GET_CUSTOMER_PROFILE = '/api/getCustomerProfile',
  GET_BOOKINGS = '/api/getBookings',
  GET_RESTAURANTS = '/api/getRestaurants',
  UPDATE_BOOKING = '/api/updateBooking',
  GET_DASHBOARD_METRICS = '/api/getDashboardMetrics',
  GET_INTERNAL_ERRORS = '/api/getInternalErrors',

  // Metrics
  GET_QUIET_TIMES = '/api/getQuietTimes',
  SET_QUIET_TIMES = '/api/setQuietTimes',
  GET_BOOKING_SLOTS = '/api/getBookingSlots',
  SET_BOOKING_SLOTS = '/api/setBookingSlots',

  // Restauraunts
  SET_RESTAURANT_COMMISSION = '/api/setRestaurantCommission',
}
