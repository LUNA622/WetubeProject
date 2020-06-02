// const express = require('express'); // Babel 사용 전
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import globalRouter from "./routers/globalRouter.js";
import helmet from "helmet";
import logger from "morgan";
import { localsMiddleware } from "./middlewares.js";
import routes from "./routes.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

//const PORT = 4000;

/* ORIGIN
function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
} */

// babel 방식
//const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);
//const handleHome = (req, res) => res.send("Welcome to Home!");
//const handleProfile = (req, res) => res.send("You are on my Profile");

/* Middleware
const between = (req, res, next) => {
    console.log('I AM BETWEEN!');
    next();
};
app.use(between); // global하게 모든 곳에서 middleware를 실행한다.
*/
const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());

app.use(localsMiddleware);

// app.get("/", handleHome);
// app.get("/profile", handleProfile);

app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);
app.use(routes.users, userRouter);

//app.use("/", globalRouter);
// app.use("/users", userRouter);
//app.use("/videos", videoRouter);

//app.listen(PORT, handleListening);

export default app;
