const quotes = require("./quotes.json");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
};

async function handleRequest(request) {
    try {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        const text = new URL(request.url).searchParams.get("format") === "text"

        return new Response(text ? quote : JSON.stringify({ quote: quote }), {
            headers: {
                ...headers,
                "content-type": text ? "text/plain" : "application/json"
            },
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
