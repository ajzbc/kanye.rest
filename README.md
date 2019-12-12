
  <h1>🌊 kanye.rest</h1>
  <b>A free REST API for random Kanye West quotes (Kanye as a Service)</b>

 <br />

 ## Usage

 <pre><b>GET</b> https://api.kanye.rest</pre>

 ```json
{
  "quote" : "I feel like I'm too busy writing history to read it."
}
```

 ## Development
 Created using [Cloudflare Workers](https://workers.dev)
 <br />
 - Create an account
 - Install [Wrangler](https://github.com/cloudflare/wrangler) to build

 To run locally without changes:
 - `❯ wrangler generate kanyerest https://github.com/ajzbc/kanye.rest` (Cloudflare Workers do not allow punctuation)
 - `❯ wrangler preview`

 To make changes, fork and then:
 - `❯ git clone https://github.com/{username}/kanye.rest`
 - `❯ cd kanye.rest`
 - `❯ wrangler init kanyerest` (Cloudflare Workers do not allow punctuation)
 - `❯ wrangler preview`


## License

MIT
