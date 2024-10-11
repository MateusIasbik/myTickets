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

export async function createEventTestWithoutId() {
    return {
        name: faker.person.fullName(),
        date: faker.date.future()
    }
}

// export async function getEvent() {
//     return await prisma.event.findFirst({

//     })
// }