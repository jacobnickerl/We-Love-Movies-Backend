const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const isShowing = req.query.is_showing;
  if (isShowing) {
    const showingData = await service.listShowing();
    res.json({
      data: showingData,
    });
  } else {
    const data = await service.list();
    res.json({
      data,
    });
  }
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.film = movie;
    return next();
  } else {
    return next({ status: 404, message: "Movie cannot be found." });
  }
}

function read(req, res, next) {
  const { film: data } = res.locals;
  res.json({ data });
}

async function readReviews(req, res, next) {
  const movie = res.locals.film;
  const data = await service.readReviews(movie);
  res.json({ data: data });
}

async function readTheaters(req, res, next) {
  const movie = res.locals.film;
  const data = await service.readTheaters(movie);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
};
