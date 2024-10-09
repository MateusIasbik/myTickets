import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import ticketSchema from "../schemas/tickets-schema";
import { getEventTickets, postTicket, putTicket } from "../controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter.get("/tickets/:eventId", getEventTickets);
ticketsRouter.post("/tickets", validateSchema(ticketSchema), postTicket);
ticketsRouter.put("/tickets/use/:id", putTicket);

export default ticketsRouter;