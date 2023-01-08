# Components

**tulip** provides easy to use component system that can be easily embedded in your own HTML pages or Markdown documents

## Peers

- Route: `/components/peers.html`
- Arguments:

| Query param | Value type | Description                        |
| ----------- | ---------- | ---------------------------------- |
| `symbol`    | string     | Stock/Crypto... symbol to be query |
| `depth`     | number     | Depth of the search                |

- Example embed:

```html
<iframe style="width: 100%; height: 500px;" src="http://YOUR-SERVER:PORT/components/peers.html?symbol=AAPL&depth=500"/>
```

<p align="center">
    <img alt="peers" src="assets/image-20230107193602052.png"/>
</p>



## Candles

- Route: `/components/candles.html`
- Arguments:

| Query param  | Value type        | Description                                                  |
| ------------ | ----------------- | ------------------------------------------------------------ |
| `symbol`     | string            | Stock/Crypto... symbol to be query                           |
| `resolution` | string            | One of: `1`, `60`, `D`, `M`                                  |
| `last`       | number            | Query the last N candles until today (cannot be used with `from` and `last`) |
| `from`       | UNIX milliseconds | Starting timestamp in UNIX milliseconds                      |
| `to`         | UNIX milliseconds | End timestamp in UNIX milliseconds                           |

- Example embed:

```html
<iframe style="width: 100%; height: 800px;" src="http://YOUR-SERVER:PORT/components/candles.html?symbol=AAPL&resolution=D&last=31"/>
```

<p align="center">
    <img alt="peers" src="assets/image-20230107194226135.png"/>
</p>

## Recommendation trends

Coming soon...