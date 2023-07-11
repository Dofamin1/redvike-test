import Joi from 'joi';

const validationSchemas = {
  getReservationsForDate: {
    querystring: Joi.object().keys({
      date: Joi.number().integer().min(1000000000).required(),
      amenityId: Joi.number().integer().min(1).required()
    })
  },
  getReservationsForUser: {
    params: Joi.object().keys({
      userId: Joi.number().integer().min(1).required()
    })
  }
};

export default validationSchemas;
