FROM golang:1.19-alpine AS build-stage

RUN apk add upx
WORKDIR /tulip-src
COPY . .
RUN go build -o /tulip
RUN upx /tulip

FROM alpine:latest AS release-stage

COPY --from=build-stage /tulip /tulip
ENV FINNHUB_TOKEN = ""
EXPOSE 5000
ENTRYPOINT [ "/tulip", "finnhub", "-t", "$FINNHUB_TOKEN" ]