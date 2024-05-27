import express from "express";
import { dbConnection } from "./databases/dbConnection.js";
//import { dbConnect } from "./databases/dbConnection.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import emailRouter from "./routes/emailRouter.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL,process.env.FRONTEND_URL_ADMIN],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

// Use body-parser for parsing JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/email", emailRouter);

dbConnection();
//dbConnect();

app.use(errorMiddleware);

export default app;
