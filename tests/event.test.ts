import supertest from "supertest";
import app from '../src/app';
import httpStatus from "http-status";
import prisma from "../src/database/index";
import { createEventFake, createEventTestWithoutId, createNewEventTest } from "./factories/event-factory";

const api = supertest(app);

beforeEach(async () => {
    await prisma.event.deleteMany();
});

describe("POST /events", () => {

    it("should create a event", async () => {
        const data = await createEventTestWithoutId();

        const { status } = await api.post("/events").send(data);
        expect(status).toBe(httpStatus.CREATED);
    });

    it("should return error 409 if the event name already exists", async () => {

        const data = await createNewEventTest();
        const {name, date} = data;
        const newData = {
            name, 
            date
        }

        const { status } = await api.post(`/events`).send(newData);
        expect(status).toBe(httpStatus.CONFLICT);
    });

});

describe("GET /events", () => {

    it("should get all events", async () => {
        await createNewEventTest();

        const { body } = await api.get("/events");
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    date: expect.any(String)
                })
            ])
        )
    });

});

describe("GET / events/:id", () => {

    it("should get an event by Id", async () => {
        const event = await createNewEventTest();

        const { body } = await api.get(`/events/${event.id}`);
        expect(body).toEqual(
            {
                id: event.id,
                name: expect.any(String),
                date: expect.any(String)
            }
        )
    });

    it("should return error 404 if ID isn't found", async () => {
        await createNewEventTest();
        const eventFake = await createEventFake();

        const { status } = await api.get(`/events/${eventFake.id}`);
        expect(status).toBe(httpStatus.NOT_FOUND);
    });
    
});

describe("PUT /events/:id", () => {

    it("should edit ticket by id", async () => {

        const event = await createNewEventTest();

        const updateData = await createEventTestWithoutId();

        const { status, body } = await api.put(`/events/${event.id}`).send(updateData);
        expect(status).toBe(httpStatus.OK);
        expect(body).toEqual(
            {
                id: event.id,
                name: expect.any(String),
                date: expect.any(String)
            }
        )
    });

});

describe("DELETE /events", () => {

    it("shold delete event by Id", async () => {
        const event = await createNewEventTest();

        const { status } = await api.delete(`/events/${event.id}`);
        expect(status).toBe(httpStatus.NO_CONTENT);
    });

});