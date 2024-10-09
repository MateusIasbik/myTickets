import Joi from "joi";

import { CreateEventData } from "../repositories/events-repository";

const eventSchema = Joi.object<CreateEventData>({
  name: Joi.string().required(),
  date: Joi.date().greater("now").required(),
});

export default eventSchema;