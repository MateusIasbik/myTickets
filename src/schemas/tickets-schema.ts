import Joi from "joi";

import { CreateTicketData } from "../repositories/tickets-repository";

const ticketSchema = Joi.object<CreateTicketData>({
  code: Joi.string().required(),
  owner: Joi.string().required(),
  eventId: Joi.number().min(1).required()
});

export default ticketSchema;

