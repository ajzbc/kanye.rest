// test/index.spec.ts
import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import quotes from "../src/quotes.json";

describe("API", () => {
  it("responds with a random quote (JSON)", async () => {
    const response = await SELF.fetch("http://example.com/");
    const { quote } = (await response.json()) as { quote: string };
    expect(quotes).toContain(quote);
  });
  it("responds with a random quote (TEXT)", async () => {
    const response = await SELF.fetch("http://example.com/text");
    const quote = await response.text();
    expect(quotes).toContain(quote);
  });
  it("responds with all quotes", async () => {
    const response = await SELF.fetch("http://example.com/quotes");
    const allQuotes = await response.json();
    expect(allQuotes).toEqual(quotes);
  });
  it("responds with 404", async () => {
    const response = await SELF.fetch("http://example.com/unknown");
    expect(response.status).toBe(404);
  });
});
