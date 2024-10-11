import prisma from "database";
import { faker } from "@faker-js/faker";

export async function createNewTicketTest(eventId: number) {
    return await prisma.ticket.create({
        data:
        {
            code: faker.string.uuid(),
            owner: faker.person.fullName(),
            eventId
        }
    });
}

export async function createTicketData(eventId: number) {
    return {
        code: faker.string.uuid(),
        owner: faker.person.fullName(),
        eventId
    };
}

export async function getTicketId(eventId: number) {
    return await prisma.ticket.findMany({
        where: { eventId: eventId }
    })
}

export async function updateDataTicketsTest() {
    return {
        code: faker.string.uuid(),
        owner: faker.person.fullName(),
        used: faker.datatype.boolean()
    }
}

export async function updateFakeTicketUsed() {
    return {
        code: faker.string.uuid(),
        owner: faker.person.fullName(),
        used: true
    }
}

export async function markTicketAsUsed(ticketId) {
    return await prisma.ticket.update({
        where: { id: ticketId },
        data: { used: true }
    });
}