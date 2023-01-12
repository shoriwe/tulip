import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment'

export const dashboardStore: Writable<string> = writable(
    browser && (localStorage.getItem('dashboard') || '["AAPL", "MSFT", "NET", "SNOW", "PLTR"]')
) as Writable<string>;

export const unsubscribeDashboardStore = dashboardStore.subscribe(
    (value: string) => browser && (localStorage.setItem('dashboard', value))
);
