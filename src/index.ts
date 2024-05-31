import quotes from "./quotes.json";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
app.use("*", cors());

const getRandomQuote = (): string => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};

app.all("/", (c) => c.json({ quote: getRandomQuote() }));
app.all("/text", (c) => c.text(getRandomQuote()));
app.all("/quotes", (c) => c.json(quotes));

app.all("*", (c) => c.notFound());
app.onError((err, _) =>
  new HTTPException(500, { message: err.message }).getResponse()
);

export default app;
