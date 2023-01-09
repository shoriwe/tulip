export function calcLast(resolution: string, last: number): { from: number, to: number } {
    const to: number = Date.now();
    let from: number = to;
    switch (resolution) {
        case '1':
            from -= last * 60000
            break;
        case '60':
            from -= last * 3600000
            break;
        case 'D':
            from -= last * 86400000
            break;
        case 'M':
            from -= last * 2678400000
            break;
        default:
            break;
    }
    return { from, to }
}

export function timeFromToFormat(resolution: string, from: number, to: number): { from: string, to: string } {
    let fromDString: string = "";
    let toDString: string = "";
    switch (resolution) {
        case '1':
        case '60':
            fromDString = new Date(from).toLocaleString();
            toDString = new Date(to).toLocaleString();
            break;
        case 'D':
        case 'M':
            fromDString = new Date(from).toLocaleDateString();
            toDString = new Date(to).toLocaleDateString();
            break;
        default:
            break;
    }
    return { from: fromDString, to: toDString };
}