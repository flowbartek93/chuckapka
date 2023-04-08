import { Joke } from "./../models/Joke";

export function createJoke(req, res, next) {
  const joke = new Joke({
    id: req.id,
    createdDate: req.createdDate,
    text: req.text,
  });
}
