if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(notFound);
app.use(errorHandler);

module.exports = app;
