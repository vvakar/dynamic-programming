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

                const candidates = [
                    newStepCandidate(both.distance + bothPenalty, bothPenalty ? 'X':'E', both.step, true),
                    newStepCandidate(aChanged.distance + 1, 'A', aChanged.step, false),
                    newStepCandidate(bChanged.distance + 1, 'B', bChanged.step, false)
                ];

                const winner = candidates.sort(sortFun)[0];
                state[i][j] = newStep(winner.newDistance, winner.nextStep);
            }
        }

        return  {
            distance: state[state.length - 1][state[0].length - 1].distance,
            path: reconstructPath(state, a, b)
        };
    }

    function reconstructPath(state: StateEntry[][], a:string, b:string) {
        // printState(state, a, b);

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

    function newStep(dist: number, step: string): StateEntry { return { distance: dist, step: step}; }
    function newStepCandidate(dist: number, step: string, prevStep: string, isBoth: boolean): StateEntryCandidate { return { newDistance: dist, nextStep: step, lastStep: prevStep, isBoth: isBoth}; }

    function init(a: string, b: string): StateEntry[][] {
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

    function sortFun(a: StateEntryCandidate, b: StateEntryCandidate) {
        let comp = a.newDistance < b.newDistance ? -1 : a.newDistance === b.newDistance ? 0 : 1;
        if (comp === 0) {
            if ((a.lastStep === 'E' || a.lastStep ==='X') && a.isBoth) comp = -1; // Shortest path with E/X wins
            if ((b.lastStep === 'E' || b.lastStep ==='X') && b.isBoth) comp = 1;

            else if (a.lastStep === 'E') comp = -1; // E wins otherwise
            else if (b.lastStep === 'E') comp = 1;
            else if (a.lastStep === 'X') comp = -1; // X wins over B
            else if (b.lastStep === 'X') comp = 1;

            else if (a.lastStep === 'A') comp = 1; // A always loses
            else if (b.lastStep === 'A') comp = -1;

            else if (a.nextStep === 'E') comp = -1; // E always wins
            else if (b.nextStep === 'E') comp = 1;
            else if (a.nextStep === 'X') comp = -1; // X wins over B
            else if (b.nextStep === 'X') comp = 1;
            else if (a.nextStep === 'A') comp = 1; // A always loses
            else if (b.nextStep === 'A') comp = -1;
            else comp = -1; // default fallback
        }

        return comp;
    }

    function printState(state: StateEntry[][], a:string, b:string) {
        process.stdout.write(`\n\n           `);
        for (let j = 0; j < state[0].length; ++j)
            process.stdout.write(`  ${b.charAt(j)}    `);

        for (let i = 0; i < state.length; ++i) {
            if (i > 0)
                process.stdout.write(`\n ${a.charAt(i-1)} `);
            else
                process.stdout.write(`\n   `);


            for (let j = 0; j < state[0].length; ++j) {
                const s = state[i][j];
                if (s) {
                    process.stdout.write(` {${s.distance},${s.step || ' '}} `);
                }
            }
        }
    }

    interface StateEntry {
        readonly distance: number;
        readonly step: string;
    }

    interface StateEntryCandidate {
        readonly newDistance: number;
        readonly lastStep: string;
        readonly nextStep: string;
        readonly isBoth: boolean;
    }
}

module.exports = fun();