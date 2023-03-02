import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError, {isHttpError} from "http-errors";
import morgan from "morgan";
import testrou from "./test/test.routes";
import rateLimit from 'express-rate-limit'
const app = express();
app.use(morgan("dev"))
app.use(express.json());


app.use(
    rateLimit(
        {
            windowMs: 5000,
            max: 10,
            message: {
                status: 429,
                message: "Too many requests, please try again later"
            }
        }
    )
)
app.use("/", testrou)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint Not found"))
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred!";
    let errorCode = 500;
    if (isHttpError(error)) {
        errorMessage = error.message;
        errorCode = error.status;
    }
    res.status(errorCode).json({ status: errorCode, message: errorMessage })
});

export default app;
