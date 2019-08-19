addEventListener("fetch", async event => {

    const { request } = event;
    const { url, method } = request;

    const url_string = new URL(url);

    if (url_string.searchParams.get('format')) {
        const format = url_string.searchParams.get("format").toLocaleLowerCase().split("/")[0];
        if (format === 'text') {
            event.respondWith(new Response(getQuote(), {
                headers: {
                    'content-type': 'text/html',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            }));
        }
        else {
            event.respondWith(new Response('Format not recognized. Please refer to https://kanye.rest', {
                headers: {
                    'content-type': 'text/html',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            }));
        }
    } else {
        event.respondWith(new Response(JSON.stringify({ quote: getQuote() }), {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        }));
    }

    function getQuote() {
        return quotes[Math.floor(Math.random() * (quotes.length))];
    }
});

var quotes = [
    "I hate when I'm on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle",
    "If I got any cooler I would freeze to death",
    "I wish I had a friend like me",
    "People only get jealous when they care.",
    "One of my favorite of many things about what the Trump hat represents to me is that people can't tell me what to do because I'm black",
    "Fur pillows are hard to actually sleep on",
    "Tweeting is legal and also therapeutic",
    "I'm nice at ping pong",
    "Shut the fuck up I will fucking laser you with alien fucking eyes and explode your fucking head",
    "Sometimes I push the door close button on people running towards the elevator. I just need my own elevator sometimes. My sanctuary.",
    "I'm the best",
    "I love sleep; it's my favorite.",
    "Believe in your flyness...conquer your shyness.",
    "You can't look at a glass half full or empty if it's overflowing.",
    "I care. I care about everything. Sometimes not giving a f#%k is caring the most.",
    "Only free thinkers",
    "I leave my emojis bart Simpson color",
    "Just stop lying about shit. Just stop lying.",
    "I feel like me and Taylor might still have sex",
    "Truth is my goal. Controversy is my gym. I'll do a hundred reps of controversy for a 6 pack of truth",
    "I really love my Tesla. I'm in the future. Thank you Elon.",
    "Have you ever thought you were in love with someone but then realized you were just staring in a mirror for 20 minutes?",
    "Style is genderless",
    "Today is the best day ever and tomorrow's going to be even better",
    "I give up drinking every week",
    "Burn that excel spread sheet",
    "I feel calm but energized",
    "The thought police want to suppress freedom of thought",
    "I feel like I'm too busy writing history to read it.",
    "Man... whatever happened to my antique fish tank?",
    "My dad got me a drone for Christmas",
    "I make awesome decisions in bike stores!!!",
    "Perhaps I should have been more like water today",
    "The world is our office",
    "Everything you do in life stems from either fear or love",
    "My greatest award is what I'm about to do.",
    "For me, money is not my definition of success. Inspiring people is a definition of success",
    "The world is our family",
    "One day I'm gon' marry a porn star",
    "distraction is the enemy of vision",
    "I want the world to be better! All I want is positive! All I want is dopeness!",
    "Decentralize",
    "George Bush doesn't care about black people",
    "I think I do myself a disservice by comparing myself to Steve Jobs and Walt Disney and human beings that we've seen before. It should be more like Willy Wonka...and welcome to my chocolate factory.",
    "Sometimes you have to get rid of everything",
    "2024",
    "I'm a creative genius",
    "I still think I am the greatest.",
    "People always tell you 'Be humble. Be humble.' When was the last time someone told you to be amazing? Be great! Be awesome! Be awesome!",
    "People always say that you can't please everybody. I think that's a cop-out. Why not attempt it? Cause think of all the people that you will please if you try.",
    "Let's be like water",
    "Pulling up in the may bike",
    "I'd like to meet with Tim Cook. I got some ideas",
    "If I don't scream, if I don't say something then no one's going to say anything.",
    "All you have to be is yourself",
    "We came into a broken world. And we're the cleanup crew.",
    "Keep squares out yo circle",
    "I'll say things that are serious and put them in a joke form so people can enjoy them. We laugh to keep from crying.",
    "For me giving up is way harder than trying.",
    "We all self-conscious. I'm just the first to admit it.",
    "My greatest pain in life is that I will never be able to see myself perform live.",
    "Keep your nose out the sky, keep your heart to god, and keep your face to the rising sun."
];