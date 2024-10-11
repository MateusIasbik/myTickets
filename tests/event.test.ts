import supertest from "supertest";
import app from '../src/app';
import httpStatus from "http-status";
import prisma from "../src/database/index";
import { createEventTestWithoutId, createNewEventTest } from "./factories/event-factory";

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

});

describe("GET /events", () => {

    it("should get all events", async () => {
        const event = await createNewEventTest();

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

// describe("GET /events", () => {

//     it("should return all events", async () => {
//         const { status, body } = await api.get("/events");
//         expect(status).toBe(httpStatus.OK);
//         expect(body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     "name": expect.any(String),
//                     "date": expect.any(String)
//                 })
//             ])
//         );

//     });

//     it("should return an specific event", async () => {
//         const event = await createNewEventTest();
//         const { status, body } = await api.get(`/events/${event.id}`);
//         expect(status).toBe(httpStatus.OK);
//         expect(body).toMatchObject(
//             {
//                 "name": event.name,
//                 "date": event.date
//             }
//         )

//     });

// })