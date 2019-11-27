/**
 * Levenshtein distance using recursion/memoizing, also known as top-down solution.
 *
 * Strategy:
 *  1. we only need to memoize based on a and b length rather than a and b because it's always going to be the tail end of each.
 *  2. we additionally memoize each step taken so we can reconstruct the path
 *
 *  Step Legend:
 *  A - keep a side, remove one b
 *  B - keep b side, remove one a
 *  E - a and b equal, remove both
 *  X - a and b different, remove both
 *
 */
let memo: any;

export function levenshteinMemoize(a: string, b: string) {
    memo = {};
    memo[key('', '')] = dist('', 0);

    const d = editDistanceMemo(a, b);
    const path = reconstructPath(a, b);
    return {value: d.value, path: path};
}

function dist(step: string, value: number): StateEntry {
    return {step: step, value: value};
}

function key(a: string, b: string) {
    return a.length + '--' + b.length;
}

function editDistanceMemo(a: string, b: string) {
    const prop = key(a, b);
    if (memo[prop]) return memo[prop];

    let res;
    if (a.length === 0) res = dist('A'.repeat(b.length), b.length);
    else if (b.length === 0) res = dist('B'.repeat(a.length), a.length);
    else {
        const ahead = a.charAt(0);
        const atail = a.substring(1);
        const bhead = b.charAt(0);
        const btail = b.substring(1);

        if (ahead === bhead)
            res = dist('E', editDistanceMemo(atail, btail).value);
        else {
            const aa = editDistanceMemo(a, btail);
            const bb = editDistanceMemo(atail, b);
            const xx = editDistanceMemo(atail, btail);

            if (xx.value <= aa.value && xx.value <= bb.value)
                res = dist('X', xx.value + 1);
            else if (bb.value <= aa.value)
                res = dist('B', bb.value + 1);
            else
                res = dist('A', aa.value + 1);
        }
    }

    return memo[prop] = res;
}

function reconstructPath(a: string, b: string): any {
    const k = key(a, b);
    const dist = memo[k];

    switch (dist.step) {
        case 'E':
        case 'X':
            return dist.step + reconstructPath(a.substr(1), b.substr(1));
        case 'A':
            return dist.step + reconstructPath(a, b.substr(1));
        case 'B':
            return dist.step + reconstructPath(a.substr(1), b);
        default:
            return dist.step;
    }
}

interface StateEntry {
    readonly value: number;
    readonly step: string;
}


