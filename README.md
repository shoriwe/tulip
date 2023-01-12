# tulip

[![Build](https://github.com/shoriwe/tulip/actions/workflows/build.yaml/badge.svg)](https://github.com/shoriwe/tulip/actions/workflows/build.yaml)
[![codecov](https://codecov.io/gh/shoriwe/tulip/branch/main/graph/badge.svg?token=3XP6AV109Z)](https://codecov.io/gh/shoriwe/tulip)
![GitHub go.mod Go version](https://img.shields.io/github/go-mod/go-version/shoriwe/tulip)
[![Go Report Card](https://goreportcard.com/badge/github.com/shoriwe/tulip)](https://goreportcard.com/report/github.com/shoriwe/tulip)

<p align="center">
    <img style="width: 50%; height: auto;" src="logo.png"/>
</p>
Extensible market data REST API, made with the intention to interact with multiple market data sources but using the same interface for all.

## Running with Yahoo finance as data source

```shell
tulip yahoo
```

## Dashboard preview

![image-20230112102648846](docs/assets/image-20230112102648846.png)

## Components preview

| ![recommendation-trends](docs/assets/image-20230109133611842.png) | ![Peers](docs/assets/image-20230107193602052.png)   |
| ------------------------------------------------------------ | --------------------------------------------------- |
| ![Candles](docs/assets/image-20230107210247207.png)          | ![heatmap](docs/assets/image-20230109203313081.png) |

## Extending tulip

To extend tulip you can write your own `Source` interface implementations, querying for the necessary data sources you need, such as Yahoo finance API...

## Documentation

| Documentation     | URL                                                          |
| ----------------- | ------------------------------------------------------------ |
| Components        | [docs/Components.md](docs/Components.md)                     |
| OpenAPI           | [docs/api.openapi.yaml](docs/api.openapi.yaml)               |
| Library           | [https://pkg.go.dev/github.com/shoriwe/tulip](https://pkg.go.dev/github.com/shoriwe/tulip) |
| CLI               | [docs/CLI.md](docs/CLI.md)                                   |
| JavaScript client | **Coming soon...**                                           |

## REST API Clients

Coming soon...

## Binaries

You will find pre-build binaries at the [release](https://github.com/shoriwe/tulip/releases) section. If none of these binaries targets your platform use [Go command](#Go-command)

## Docker image

```shell
docker pull ghcr.io/shoriwe/tulip:latest
```

## Building from source

### Go command

```shell
go install github.com/shoriwe/tulip@latest
```

### Local build

```shell
git clone https://github.com/shoriwe/tulip
cd tulip
mkdir -p bin && go build -o bin/ .
```

### Docker image

```shell
git clone https://github.com/shoriwe/tulip
cd tulip
docker build -t tulip .
```

## Coverage

<p align="center">
    <img alt="coverage-graph" src="https://codecov.io/gh/shoriwe/tulip/branch/main/graphs/sunburst.svg?token=3XP6AV109Z"/>
</p>
