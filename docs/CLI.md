# CLI

## FinnHub

Requires an API key from [FinnHub](https://finnhub.io/).

```shell
tulip finnhub --help
```

Example:

```shell
tulip finnhub -t YOUR_TOKEN
```

## Yahoo

Cero config data source.

```shell
tulip yahoo --help
```

Example:

```shell
tulip yahoo
```

## Combined

Combined is special since it will try first to query from **FinnHub** (only if a token was specified) if it fails the query tries then with **Yahoo**.

```shell
tulip combined --help
```

Example:

```shell
tulip combined -f YOUR_FINNHUB_TOKEN -y
```

