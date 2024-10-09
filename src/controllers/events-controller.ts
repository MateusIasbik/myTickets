import { Request, Response } from "express";

import { changeEvent, createNewEvent, getAllEvents, getSpecificEvent, removeEvent } from "../services/events-service";
import httpStatus from "http-status";
import { CreateEventData, UpdateEventData } from "../repositories/events-repository";
import { isIdParamValid } from "../utils";

export async function getEvents(req: Request, res: Response) {
  const events = await getAllEvents();
  return res.send(events);
}

export async function getEvent(req: Request, res: Response) {
  const id = isIdParamValid(req.params.id);
  const event = await getSpecificEvent(id);

  return res.send(event);
}

export async function postEvent(req: Request, res: Response) {
  const eventData = req.body as CreateEventData;
  const event = await createNewEvent(eventData);

  return res.status(httpStatus.CREATED).send(event);
}

export async function putEvent(req: Request, res: Response) {
  const id = isIdParamValid(req.params.id);

  const updateEventData = req.body as UpdateEventData;
  const event = await changeEvent(updateEventData, id);

  return res.status(httpStatus.OK).send(event);
}

export async function deleteEvent(req: Request, res: Response) {
  const id = isIdParamValid(req.params.id);

  await removeEvent(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}