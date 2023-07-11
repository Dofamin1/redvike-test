const reservationsForDateResponse = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        amenityName: { type: 'string' },
        startTime: { type: 'string', format: 'date-time' },
        duration: { type: 'integer' }
      }
    }
};

const responsesSchemas = {
  getReservationsForDate: {
    200: reservationsForDateResponse,
  }
};

export default responsesSchemas;
