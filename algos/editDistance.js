
function editDistance(a, b) {
    return editDistanceMemo(a,b);
}

const memo = {};
function editDistanceMemo(a, b) {
    const prop = a + ';;;;;' + b;
    if (memo[prop]) return memo[prop];

    const res = editDistanceImpl(a,b);
    memo[prop] = res;
    return res;
}

function editDistanceImpl(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const ahead = a.charAt(0);
    const atail = a.substring(1);
    const bhead = b.charAt(0);
    const btail = b.substring(1);

    if (ahead === bhead) return editDistance(atail, btail);
    else return 1 + Math.min(editDistanceMemo(a, btail), editDistanceMemo(atail, b), editDistanceMemo(atail, btail));
}

module.exports = editDistance;