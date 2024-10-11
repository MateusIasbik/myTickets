import prisma from "database";
import { faker } from "@faker-js/faker";

export async function createNewEventTest() {
    return await prisma.event.create({
        data: {
            name: faker.person.fullName(),
            date: faker.date.future()
        }
    });
}

export async function createNewEventWithPastDate() {
    return await prisma.event.create({
        data: {
            name: faker.person.fullName(),
            date: faker.date.past()
        }
    });
}

export async function createEventTestWithoutId() {
    return {
        name: faker.person.fullName(),
        date: faker.date.future()
    }
}

export async function createEventFake() {
    return {
        id: parseFloat((Math.random()).toFixed(10)),
        name: faker.person.fullName(),
        date: faker.date.future()
    }
}