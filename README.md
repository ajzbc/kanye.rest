# [kanye.rest](https://kanye.rest)

A free REST API for random Kanye West quotes (Kanye as a Service).

Built with [Cloudflare Workers](https://workers.cloudflare.com/).

## Usage

### `GET` [https://api.kanye.rest](https://api.kanye.rest)

```json
{
    "quote": "I feel like I'm too busy writing history to read it."
}
```

or

### `GET` [https://api.kanye.rest/text](https://api.kanye.rest/text)

```text
The world is our office
```

## Development

Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/get-started/#installation)

```shell
npx wrangler dev
```

## License

MIT
