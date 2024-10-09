import { Event } from "@prisma/client";
import prisma from "../database";

export type CreateEventData = Omit<Event, "id">;
export type UpdateEventData = CreateEventData;

export async function findAllEvents() {
  return await prisma.event.findMany();
}

export async function findEventById(id: number) {
  return await prisma.event.findUnique({
    where: { id }
  })
}

export async function findEventByName(name: string) {
  return await prisma.event.findUnique({
    where: {
      name
    }
  })
}

export async function saveEvent(data: CreateEventData) {
  return await prisma.event.create({
    data: {
      ...data,
      date: new Date(data.date)
    }
  });
}

export async function updateEvent(data: UpdateEventData, id: number) {
  return await prisma.event.update({
    data: {
      ...data,
      date: new Date(data.date)
    },
    where: { id }
  });
}

export async function deleteEvent(id: number) {
  return await prisma.event.delete({
    where: {
      id
    }
  })
}