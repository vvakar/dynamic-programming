/**
 * Levenshtein distance using tabulation/iteration, also known as bottom-up solution.
 *
 */
function fun() {
    function levenshteinIterative(a: string, b: string) {
        const state = init(a,b);

        for (let j = 1; j < state[0].length; ++j) {
            for (let i = 1; i < state.length; ++i) {

                const both = state[i-1][j-1];
                let charB = b.charAt(j-1);
                let charA = a.charAt(i-1);
                const bothPenalty = charA !== charB ? 1 : 0;

                const bChanged = state[i-1][j];
                const aChanged = state[i][j-1];

                if (both.distance + bothPenalty <= bChanged.distance + 1 && both.distance + bothPenalty <= aChanged.distance + 1) {
                    // Keeping or dropping both letters and taking penalty if needed
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

        return  {
            distance: state[state.length - 1][state[0].length - 1].distance,
            path: reconstructPath(state)
        };
    }

    function reconstructPath(state: any) {
        let path = '';
        let i = state.length - 1;
        let j = state[0].length - 1;

        do {
            const s = state[i][j];
            path = s.step + path;

            switch (s.step) {
                case 'B': --i; break;
                case 'A': --j; break;
                case 'X':
                case 'E': --i; --j; break;
            }

        } while (i > 0 || j > 0);

        return path;
    }

    function newStep(dist: number, step: string) { return { distance: dist, step: step}; }

    function init(a: string, b: string) {
        const state = Array(a.length + 1);
        for (let i = 0; i < state.length; ++i)
            state[i] = Array(b.length + 1);

        for (let i = 1; i < state.length; ++i)
            state[i][0] = newStep(i, 'B');

        for (let j = 1; j < state[0].length; ++j)
            state[0][j] = newStep(j, 'A');

        state[0][0] = newStep(0, '');

        return state;
    }
    return levenshteinIterative;
}

module.exports = fun();