import configDotEnv from "./config";
import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { usersRouter } from "./routes/users";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import { cardRouter } from "./routes/cards";
import morgan from "morgan";
import cors from "cors";
import { Logger } from "./logs/logger";
import { taskRouter } from "./routes/tasks";

configDotEnv();

connect();

const app = express();
app.use(
  cors({
    // allow my client side
    origin: process.env.CLIENT_URL,
  })
);
Logger.info("Connect");
app.use(express.static("public"));
// middleware chain:
app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(9090);
// const PORT = process.env.PORT ?? 8081;
// app.listen(process.env.PORT, () => {
//   // callback when the app is running:
//   Logger.info(`App is running: http://localhost:${PORT}`);
// });
