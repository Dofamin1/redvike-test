const reservationsForDateResponse = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        amenityName: { type: 'string' },
        startTime: { type: 'string' },
        duration: { type: 'integer' }
      }
    }
};

const reservationsForUserResponse = {
    type: 'object',
    patternProperties: {
        '^[0-9]+$': {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    amenityId: { type: 'integer' },
                    startTime: { type: 'integer' },
                    endTime: { type: 'integer' },
                    date: { type: 'integer' }
                }
            }
        }
    }
}

const responsesSchemas = {
  getReservationsForDate: {
    200: reservationsForDateResponse,
  },
  getReservationsForUser: {
    200: reservationsForUserResponse,
  }
};

export default responsesSchemas;
