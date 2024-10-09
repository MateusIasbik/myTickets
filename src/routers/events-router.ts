import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import eventSchema from "../schemas/events-schema";
import { deleteEvent, getEvents, getEvent, postEvent, putEvent } from "../controllers/events-controller";

const eventsRouter = Router();

eventsRouter.get("/events", getEvents);
eventsRouter.get("/events/:id", getEvent);
eventsRouter.post("/events", validateSchema(eventSchema), postEvent);
eventsRouter.put("/events/:id", validateSchema(eventSchema), putEvent);
eventsRouter.delete("/events/:id", deleteEvent);

export default eventsRouter;