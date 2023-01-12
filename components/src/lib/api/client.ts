import type { SelectOptionType } from "flowbite-svelte/types";
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

export interface RecommendationTrends {
    buy: number
    strongBuy: number
    sell: number
    strongSell: number
    hold: number
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

export async function recommendationTrends(symbol: string): Promise<RecommendationTrends> {
    const response: Response = await fetch(`${baseUrl}/api/recommendation/trends/${symbol}`);
    const trend: RecommendationTrends = await response.json()
    return trend;
}

export interface Note {
    name: string
    content: string
}

export async function createNote(name: string): Promise<void> {
    const response: Response = await fetch(`${baseUrl}/api/notes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, content: '' })
    });
}

export async function getNote(name: string): Promise<Note> {
    name = encodeURI(name);
    const response: Response = await fetch(`${baseUrl}/api/notes/${name}`);
    if (response.status !== 200) throw "note doesn't exists"
    const note: Note = await response.json();
    return note;
}

export async function noteExists(name: string): Promise<boolean> {
    try {
        await getNote(name);
        return true;
    } catch (e) {
        return false;
    }
}

export async function updateNote(name: string, content: string): Promise<void> {
    name = encodeURI(name);
    const response: Response = await fetch(`${baseUrl}/api/notes/${name}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
}

export async function listNotes(): Promise<Note[]> {
    const response: Response = await fetch(`${baseUrl}/api/notes`);
    const notes: Note[] = await response.json();
    return notes;
}

export async function deleteNote(name: string): Promise<void> {
    name = encodeURI(name);
    const response: Response = await fetch(`${baseUrl}/api/notes/${name}`, {
        method: 'DELETE',
    });
}

export const resolutions: string[] = [ '1', '60', 'D', 'M' ];
export const resolutionsOptions: SelectOptionType[] = [
    ...resolutions.map((r: string): SelectOptionType => {
        return { value: r, name: r };
    })
];
export function symbolsToNoteName(symbols: string[]): string {
    const sortedSymbols: string[] = symbols.sort();
    return 'dashboard-' + sortedSymbols.join('-');
}