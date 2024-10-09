import { CreateEventData, deleteEvent, findAllEvents, findEventById, findEventByName, saveEvent, updateEvent, UpdateEventData } from "../repositories/events-repository";

export async function getAllEvents() {
  return await findAllEvents();
}

export async function getSpecificEvent(id: number) {
  const event = await findEventById(id);

  if (!event) throw {
    type: "not_found",
    message: `Event with id ${id} not found.`
  }

  return event;
}

export async function createNewEvent(eventData: CreateEventData) {
  await checkUniqueEventName(eventData.name);
  return await saveEvent(eventData);
}

export async function changeEvent(updateEventData: UpdateEventData, id: number) {
  const event = await getSpecificEvent(id);

  if (updateEventData.name !== event.name) {
    await checkUniqueEventName(updateEventData.name)
  }

  return await updateEvent(updateEventData, id);
}

export async function removeEvent(id: number) {
  await getSpecificEvent(id);
  return await deleteEvent(id);
}

async function checkUniqueEventName(name: string) {
  const existingEvent = await findEventByName(name);
  if (existingEvent) {
    throw {
      type: "conflict",
      message: `Event with name ${name} already registered.`
    }
  }
}

