// const express = require('express'); // Babel ��� ��
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

/* ORIGIN
function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
} */

// babel ���
const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);
const handleHome = (req, res) => res.send("Welcome to Home!");
const handleProfile = (req, res) => res.send("You are on my Profile");

/* Middleware
const between = (req, res, next) => {
    console.log('I AM BETWEEN!');
    next();
};
app.use(between); // global�ϰ� ��� ������ middleware�� �����Ѵ�.
*/

app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

