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

### `GET` [https://api.kanye.rest/text](https://api.kanye.rest/text)

```text
The world is our office
```

### `GET` [https://api.kanye.rest/quotes](https://api.kanye.rest/quotes)

> [!WARNING]  
> This response format may change.

```ts
[
    ...,
    "I leave my emojis bart Simpson color",
    "I love sleep; it's my favorite.",
    ...,
]
```

## Development

```shell
pnpm dev
```

## License

MIT
