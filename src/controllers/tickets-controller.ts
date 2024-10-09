import { Request, Response } from "express";
import { createNewTicket, getAllTickets, useTicket } from "../services/tickets-service";
import httpStatus from "http-status";
import { CreateTicketData } from "../repositories/tickets-repository";
import { isIdParamValid } from "../utils";

export async function getEventTickets(req: Request, res: Response) {
  const eventId = isIdParamValid(req.params.eventId);
  const tickets = await getAllTickets(eventId);

  return res.send(tickets);
}

export async function putTicket(req: Request, res: Response) {
  const id = isIdParamValid(req.params.id);

  await useTicket(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}

export async function postTicket(req: Request, res: Response) {
  const ticketData = req.body as CreateTicketData;
  const ticket = await createNewTicket(ticketData);

  return res.status(httpStatus.CREATED).send(ticket);
}

