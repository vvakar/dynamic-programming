/**
 * Levenshtein distance using tabulation/iteration, also known as bottom-up solution.
 *
 */
import {StateEntry, initState, newStep, newStepCandidate, sortFun, printState} from './util/iterativeUtil';

export function levenshteinIterative(a: string, b: string) {
    const state = initState(a, b, x => x);

    for (let j = 1; j < state[0].length; ++j) {
        for (let i = 1; i < state.length; ++i) {

            const both = state[i - 1][j - 1];
            let charB = b.charAt(j - 1);
            let charA = a.charAt(i - 1);
            const bothPenalty = charA !== charB ? 1 : 0;

            const bChanged = state[i - 1][j];
            const aChanged = state[i][j - 1];

            const candidates = [
                newStepCandidate(both.value + bothPenalty, bothPenalty ? 'X' : 'E', both.step, true),
                newStepCandidate(aChanged.value + 1, 'A', aChanged.step, false),
                newStepCandidate(bChanged.value + 1, 'B', bChanged.step, false)
            ];

            const winner = candidates.sort(sortFun)[0];
            state[i][j] = newStep(winner.newValue, winner.nextStep);
        }
    }

    return {
        value: state[state.length - 1][state[0].length - 1].value,
        path: reconstructPath(state, a, b)
    };
}

function reconstructPath(state: StateEntry[][], a: string, b: string) {
    // printState(state, a, b);

    let path = '';
    let i = state.length - 1;
    let j = state[0].length - 1;

    do {
        const s = state[i][j];
        path = s.step + path;

        switch (s.step) {
            case 'B':
                --i;
                break;
            case 'A':
                --j;
                break;
            case 'X':
            case 'E':
                --i;
                --j;
                break;
        }

    } while (i > 0 || j > 0);

    return path;
}

