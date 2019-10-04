const quotes = require('./quotes.json'),
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        }

const randomQuote = () => quotes[Math.floor(Math.random() * (quotes.length))],

const handleRequest = request => {
    const responseType = await determineResponseFormat(request),
            quote = randomQuote()

    if(responseType)
        return new Response(JSON.stringify({ quote }), {
            headers: {
                'content-type': 'application/json',
                ...headers
            }
        })
    else
        return new Response(quote, {
            headers: {
                'content-type': 'text/plain',
                ...headers
            }
        })
}

//todo rewrite this
const determineResponseFormat = request => {
    const url_string = new URL(request.url),
            accept = request.headers.get('Accept')

    let format = null

    if(url_string.searchParams.get("format"))
        format = url_string.searchParams.get("format").toLocaleLowerCase().split("/")[0];

    if(!format && !accept)
        return true
    else if (format == 'json')
        return true
    else if (format == 'text')
        return false
    else if (accept == 'application/json')
        return true
    else if (accept == 'text/plain')
        return false
    else
        return true
}

addEventListener('fetch', event => event.respondWith(handleRequest(event.request)))