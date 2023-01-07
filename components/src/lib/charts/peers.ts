import { peers } from "$lib/api/client";

type peersResult = {
    [name: string]: {
        weight: number
        peers: string[]
    }
};

async function mapPeers(symbol: string, depth: number, result: peersResult = {}): Promise<peersResult> {
    if (result[symbol] !== undefined) {
        result[symbol].weight++;
        return result;
    } else {
        result[symbol] = { weight: 10, peers: [] }
    }
    if (depth === 0) return result;
    //
    try {
        const symbolPeers: Set<string> = new Set<string>(await peers(symbol));
        symbolPeers.delete(symbol);
        result[symbol].peers = [...symbolPeers];
        //
        for (let index in result[symbol].peers) {
            let peer: string = result[symbol].peers[index];
            result = await mapPeers(peer, depth - 1, result);
        }
        //
    } catch { }
    return result;
}

export async function peersOptions(target: string, depth: number): Promise<any> {
    const p: peersResult = await mapPeers(target, depth);
    const graph: any = {
        nodes: [],
        links: [],
        categories: []
    }
    let positions: { [name: string]: number } = {};
    let index: number = 0;
    for (let symbol in p) {
        if (positions[symbol] !== undefined) {
            continue;
        }
        positions[symbol] = index;
        graph.nodes.push({
            id: symbol,
            name: symbol,
            symbolSize: p[symbol].weight,
            category: index
        })
        graph.categories.push({
            name: symbol
        })
        index++;
    }
    let links: { [name: string]: Set<string> } = {};
    for (let symbol in p) {
        links[symbol] = new Set<string>();
        for (let peerIndex in p[symbol].peers) {
            const peer: string = p[symbol].peers[peerIndex];
            if (links[peer] !== undefined) {
                if (!links[peer].has(symbol)) {
                    links[peer].add(symbol);
                }
                continue;
            }
            if (!links[symbol].has(peer)) {
                links[symbol].add(peer);
            }
        }
    }
    for (let symbol in links) {
        const symbolPeers: string[] = [...links[symbol]];
        for (let peerIndex in symbolPeers) {
            const peer: string = symbolPeers[peerIndex];
            graph.links.push({
                source: symbol,
                target: peer
            })
        }
    }
    let option = {
        title: {
            text: `${target} peers`,
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'circular',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    show: true,
                    position: 'center',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    return option;
}