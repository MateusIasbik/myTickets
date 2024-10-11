import supertest from "supertest";
import app from '../src/app';
import httpStatus from "http-status";
import prisma from "../src/database/index";
import { createNewTicketTest, createTicketData, updateDataTicketsTest } from "./factories/ticket-factory";
import { createNewEventTest } from "./factories/event-factory";

const api = supertest(app);

beforeEach(async () => {
    await prisma.event.deleteMany();
});

describe("POST /tickets", () => {

    it("should create a ticket", async () => {

        const event = await createNewEventTest();
        const ticketData = await createTicketData(event.id);

        const { status } = await api.post("/tickets").send(ticketData);

        expect(status).toBe(httpStatus.CREATED);
    });

});

describe("GET /tickets", () => {

    it("should return all ticket by id", async () => {

        const event = await createNewEventTest();
        await createNewTicketTest(event.id);

        const { body } = await api.get(`/tickets/${event.id}`);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    code: expect.any(String),
                    owner: expect.any(String),
                    eventId: event.id,
                    used: expect.any(Boolean)
                })
            ])
        )
    });

});

describe("PUT /tickets", () => {

    it("should edit ticket by id", async () => {

        const event = await createNewEventTest();
        const ticket = await createNewTicketTest(event.id);

        const updateData = await updateDataTicketsTest();

        const { status } = await api.put(`/tickets/use/${ticket.id}`).send(updateData);
        expect(status).toBe(httpStatus.NO_CONTENT);
    });

});