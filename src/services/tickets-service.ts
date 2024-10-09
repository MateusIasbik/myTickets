import { Event, Ticket } from "@prisma/client";
import { ERRORS } from "../middlewares/error-middleware";
import { CreateTicketData, findAllEventTickets, findTicketByCodeForEvent, findTicketById, saveTicket, updateTicketUse as updateTicketToUsed } from "../repositories/tickets-repository";
import { getSpecificEvent } from "./events-service";

export async function getAllTickets(eventId: number) {
  return await findAllEventTickets(eventId);
}

export async function createNewTicket(ticketData: CreateTicketData) {
  const event = await getSpecificEvent(ticketData.eventId);
  if (isEventTicketExpired(event)) {
    throw {
      type: "forbidden",
      message: `The event has already happened.`
    }
  }

  const ticket = await findTicketByCodeForEvent(event.id, ticketData.code);
  if (ticket) {
    throw {
      type: "conflict",
      message: `Ticket with code ${ticketData.code} for event id ${event.id} already registered.`
    }
  }

  return await saveTicket(ticketData);
}

export async function useTicket(id: number) {
  const { Event: event, used } = await getSpecificTicket(id);
  if (isEventTicketExpired(event) || used) {
    throw {
      type: "forbidden",
      message: `The event has already happened or ticket was already used.`
    }
  }

  return await updateTicketToUsed(id);
}

async function getSpecificTicket(id: number) {
  const ticket = await findTicketById(id);

  if (!ticket) throw {
    type: "not_found",
    message: `Ticket with id ${id} not found.`
  }

  return ticket;
}

function isEventTicketExpired(event: Event) {
  return Date.now() > event.date.getTime();
}