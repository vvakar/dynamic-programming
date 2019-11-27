import {StateEntry, initState, newStep, newStepCandidate, printState, sortFun} from './util/iterativeUtil';

export function LCS(as: string, bs: string): number {
    const state = initState(as, bs, () => 0);
    let max = 0;

    for (let j = 1; j <= bs.length; ++j)
        for (let i = 1; i <= as.length; ++i) {
            const a = as.charAt(i - 1);
            const b = bs.charAt(j - 1);

            const both = state[i - 1][j - 1];
            const bothBonus = a === b ? 1 : 0;
            const aAdvanced = state[i][j - 1];
            const bAdvanced = state[i - 1][j];

            const candidates = [
                newStepCandidate(both.value + bothBonus, 'E', both.step, true),
                newStepCandidate(aAdvanced.value, 'A', aAdvanced.step, false),
                newStepCandidate(bAdvanced.value, 'B', bAdvanced.step, false)
            ];

            const winner = candidates.sort(sortFun)[candidates.length - 1];
            state[i][j] = newStep(winner.newValue, winner.nextStep);
            max = Math.max(max, state[i][j].value);

        }

    // printState(state, as, bs);
    return max;
}
