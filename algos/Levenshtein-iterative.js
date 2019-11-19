
function fun() {
    function levenshteinIterative(a, b) {
        const state = init(a,b);

        for (let i = 1; i < state.length; ++i) {
            for (let j = 1; j < state[0].length; ++j) {

                const both = state[i-1][j-1];
                let charB = b.charAt(j-1);
                let charA = a.charAt(i-1);
                const bothPenalty = charA !== charB ? 1 : 0;

                const aChanged = state[i-1][j];
                const bChanged = state[i][j-1];

                if (both.distance + bothPenalty <= aChanged.distance + 1 && both.distance + bothPenalty <= bChanged.distance + 1) {
                    // Keeping both letters and taking penalty if needed
                    state[i][j] = newStep(both.distance + bothPenalty, bothPenalty ? 'X':'E');
                } else if (aChanged.distance <= bChanged.distance) {
                    // dropping a and taking penalty of 1
                    state[i][j] = newStep(aChanged.distance + 1, 'A');
                } else {
                    // dropping b and taking penalty of 1
                    state[i][j] = newStep(bChanged.distance + 1, 'B');
                }
            }
        }

        return  { distance: state[state.length - 1][state[0].length - 1].distance, path: '' };
    }

    function newStep(dist, step) { return { distance: dist, step: step}; }

    function init(a, b) {
        const state = Array(a.length + 1);
        for (let i = 0; i < state.length; ++i)
            state[i] = Array(b.length + 1);

        for (let i = 1; i < state.length; ++i)
            state[i][0] = newStep(i, 'A');

        for (let j = 1; j < state[0].length; ++j)
            state[0][j] = newStep(j, 'B');

        state[0][0] = newStep(0, '');

        return state;
    }
    return levenshteinIterative;
}

module.exports = fun();