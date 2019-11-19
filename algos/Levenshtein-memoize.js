/**
 * Levenshtein distance using recursion/memoizing
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
function fun() {
    let memo;

    function levenshteinMemoize(a, b) {
        memo = {};
        memo[key('', '')] = dist('', 0);

        const d = editDistanceMemo(a, b);
        const path = reconstructPath(a, b);
        return  { distance: d.distance, path: path };
    }

    function dist(step, distance) {
        return { step: step, distance: distance };
    }

    function key(a, b) {
        return a.length + '--' + b.length;
    }

    function editDistanceMemo(a, b) {
        const prop = key(a,b);
        if (memo[prop]) return memo[prop];

        return memo[prop] = editDistanceImpl(a, b);
    }

    function editDistanceImpl(a, b) {
        if (a.length === 0) return dist('A'.repeat(b.length), b.length);
        if (b.length === 0) return dist('B'.repeat(a.length), a.length);

        const ahead = a.charAt(0);
        const atail = a.substring(1);
        const bhead = b.charAt(0);
        const btail = b.substring(1);

        if (ahead === bhead)
            return dist('E', editDistanceMemo(atail, btail).distance);
        else {
            const aa = editDistanceMemo(a, btail);
            const bb = editDistanceMemo(atail, b);
            const xx = editDistanceMemo(atail, btail);

            if (aa.distance <= bb.distance && aa.distance <= xx.distance)
                return dist('A', aa.distance + 1);
            else if (bb.distance <= xx.distance)
                return dist('B', bb.distance + 1);
            else
                return dist('X', xx.distance + 1);
        }
    }

    function reconstructPath(a, b) {
        const k = key(a,b);
        const dist = memo[k];

        switch(dist.step) {
            case 'E':
            case 'X': return dist.step + reconstructPath(a.substr(1), b.substr(1));
            case 'B': return dist.step + reconstructPath(a.substr(1), b);
            case 'A': return dist.step + reconstructPath(a, b.substr(1));
            default: return dist.step;
        }
    }

    return levenshteinMemoize;
}

module.exports = fun();