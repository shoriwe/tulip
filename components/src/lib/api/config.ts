let backendUrl: string;
try {
    backendUrl = window.location.origin;

} catch {
    backendUrl = 'http://127.0.0.1:5000';
}

try {
    const req = new XMLHttpRequest();
    req.open("GET", `${backendUrl}/api/ping`);
    req.send();
    const res: Response = req.response();
    if (res.status !== 200) throw 'verify failed';
} catch {
    backendUrl = 'http://127.0.0.1:5000';
}


export const baseUrl: string = backendUrl;