import { Ticket } from "@prisma/client";

import prisma from "../database";

export type CreateTicketData = Omit<Ticket, "id" | "used">;

export async function findAllEventTickets(eventId: number) {
  return await prisma.ticket.findMany({
    where: { eventId }
  });
}

export async function findTicketById(id: number) {
  return await prisma.ticket.findUnique({
    where: { id },
    include: {
      Event: true
    }
  });
}

export async function findTicketByCodeForEvent(eventId: number, code: string) {
  return await prisma.ticket.findUnique({
    where: {
      eventId_code: {
        code,
        eventId
      }
    }
  })
}

export async function saveTicket(data: CreateTicketData) {
  return await prisma.ticket.create({
    data
  });
}

export async function updateTicketUse(id: number) {
  return await prisma.ticket.update({
    where: { id },
    data: {
      used: true
    }
  })
}