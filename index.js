const quotes = require("./quotes.json");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
};

async function handleRequest(request) {
    try {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        const json = JSON.stringify({ quote: quote });

        return new Response(json, {
            headers: { ...headers, "content-type": "application/json" },
        });
    } catch (error) {
        return new Response("An unexpected error ocurred", {
            status: 500,
            headers: { ...headers },
        });
    }
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});
