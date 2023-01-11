let backendUrl: string;
try {
    backendUrl = window.location.origin;

} catch {
    backendUrl = 'http://127.0.0.1:5000';
}

try {
    const response = await fetch(`${backendUrl}/api/ping`);
    if (response.status !== 200) throw 'invalid backend url';
} catch {
    backendUrl = 'http://127.0.0.1:5000';
}

export const baseUrl: string = backendUrl;