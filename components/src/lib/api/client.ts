import { baseUrl } from "./config";

export interface Candle {
    symbol: string
    resolution: number
    timestamp: number
    open: number
    close: number
    high: number
    low: number
    prevClose: number
    volume: number
}

export async function quote(symbol: string): Promise<Candle> {
    const response: Response = await fetch(`${baseUrl}/api/quote/${symbol}`);
    const candle: Candle = await response.json()
    return candle;
}

export async function candles(symbol: string, resolution: string, from: number, to: number): Promise<Candle[]> {
    const response: Response = await fetch(`${baseUrl}/api/candles/${symbol}/${resolution}/${from}/${to}`);
    const candles: Candle[] = await response.json()
    return candles;
}

export async function peers(symbol: string): Promise<string[]> {
    const response: Response = await fetch(`${baseUrl}/api/peers/${symbol}`);
    const peers: string[] = await response.json()
    return peers;
}