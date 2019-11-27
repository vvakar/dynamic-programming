/**
 * Iterative DP implementation of Lowest Common Subsequence.
 */

import {
    initState,
    newStep,
    newStepCandidateWithStep,
    reconstructPath,
    sortFun
} from './util/iterativeUtil';

export default function LCS(as: string, bs: string) {
    const state = initState(as, bs, () => 0, () => '');

    for (let j = 1; j <= bs.length; ++j)
        for (let i = 1; i <= as.length; ++i) {
            const a = as.charAt(i - 1);
            const b = bs.charAt(j - 1);

            const both = state[i - 1][j - 1];
            const bothBonus = a === b ? 1 : 0;
            const aAdvanced = state[i][j - 1];
            const bAdvanced = state[i - 1][j];

            const candidates = [
                newStepCandidateWithStep(both.value + bothBonus, 'E', a, both.direction, true),
                newStepCandidateWithStep(aAdvanced.value, 'A','', aAdvanced.direction,  false),
                newStepCandidateWithStep(bAdvanced.value, 'B', '', bAdvanced.direction,  false)
            ];

            const winner = candidates.sort(sortFun)[candidates.length - 1];
            state[i][j] = newStep(winner);
        }

    return {
        value: state[state.length - 1][state[0].length - 1].value,
        path: reconstructPath(state, as, bs)
    };
}
