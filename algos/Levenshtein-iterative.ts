/**
 * Levenshtein distance using tabulation/iteration, also known as bottom-up solution.
 *
 */
import {
    initState,
    newStep,
    newStepCandidate,
    sortFun,
    reconstructPath
} from './util/iterativeUtil';

export default function levenshteinIterative(a: string, b: string) {
    const state = initState(a, b, x => x, s => s);

    for (let j = 1; j < state[0].length; ++j) {
        for (let i = 1; i < state.length; ++i) {

            const both = state[i - 1][j - 1];
            let charB = b.charAt(j - 1);
            let charA = a.charAt(i - 1);
            const bothPenalty = charA !== charB ? 1 : 0;

            const bChanged = state[i - 1][j];
            const aChanged = state[i][j - 1];

            const candidates = [
                newStepCandidate(both.value + bothPenalty, bothPenalty ? 'X' : 'E', both.direction, true),
                newStepCandidate(aChanged.value + 1, 'A', aChanged.direction, false),
                newStepCandidate(bChanged.value + 1, 'B', bChanged.direction, false)
            ];

            const winner = candidates.sort(sortFun)[0];
            state[i][j] = newStep(winner);
        }
    }

    return {
        value: state[state.length - 1][state[0].length - 1].value,
        path: reconstructPath(state, a, b)
    };
}


