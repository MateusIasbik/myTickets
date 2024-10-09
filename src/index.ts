import express, { json, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import httpStatus from "http-status";
import errorHandlerMiddleware from "./middlewares/error-middleware";
import ticketsRouter from "./routers/tickets-router";
import eventsRouter from "./routers/events-router";

dotenv.config();

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.status(httpStatus.OK).send(`I'm okay!`));
app.use(ticketsRouter);
app.use(eventsRouter);
app.use(errorHandlerMiddleware);

const port = +process.env.PORT || 5000;
app.listen(port, () => console.log("Server is up and running on port " + port));