/**
 * A unit of state - what happened at that particular computation.
 * Includes resulting value, the direction that brought us there, and the traceback value of that direction.
 */
interface StateEntry {
    readonly value: number;
    readonly direction: string;
    readonly tracebackValue: string;
}

/**
 * A possible state transition, including current value, step, and traceback value, as well as the step previously taken.
 * isBoth=true indicates that both inputs advanced at this step.
 */
interface StateTransitionCandidate {
    readonly value: number;
    readonly prevStep: string;
    readonly tracebackValue: string;
    readonly step: string;
    readonly isBoth: boolean;
}

export function newStepCandidate(value: number, step: string, prevStep: string, isBoth: boolean): StateTransitionCandidate {
    return newStepCandidateWithStep(value, step, step, prevStep, isBoth);
}

export function newStepCandidateWithStep(value: number, step: string, stepValue: string, prevStep: string, isBoth: boolean): StateTransitionCandidate {
    return { value: value, step: step, tracebackValue: stepValue, prevStep: prevStep, isBoth: isBoth};
}

export function sortFun(a: StateTransitionCandidate, b: StateTransitionCandidate) {
    let comp = a.value < b.value ? -1 : a.value === b.value ? 0 : 1;
    if (comp === 0) {
        if ((a.prevStep === 'E' || a.prevStep ==='X') && a.isBoth) comp = -1; // Shortest path with E/X wins
        if ((b.prevStep === 'E' || b.prevStep ==='X') && b.isBoth) comp = 1;

        else if (a.prevStep === 'E') comp = -1; // E wins otherwise
        else if (b.prevStep === 'E') comp = 1;
        else if (a.prevStep === 'X') comp = -1; // X wins over B
        else if (b.prevStep === 'X') comp = 1;

        else if (a.prevStep === 'A') comp = 1; // A always loses
        else if (b.prevStep === 'A') comp = -1;

        else if (a.step === 'E') comp = -1; // E always wins
        else if (b.step === 'E') comp = 1;
        else if (a.step === 'X') comp = -1; // X wins over B
        else if (b.step === 'X') comp = 1;
        else if (a.step === 'A') comp = 1; // A always loses
        else if (b.step === 'A') comp = -1;
        else comp = -1; // default fallback
    }

    return comp;
}

/**
 * Generate initial 2d state for a variety of iterative dp algorithms.
 *
 * @param a first input string
 * @param b second input string
 * @param calcValue how to calculate the initial value at given position
 * @param calcStepValue how to calculate traceback direction value at given direction
 */
export function initState(a: string, b: string, calcValue: (n:number) => number, calcStepValue: (s: string) => string): StateEntry[][] {
    const state = Array(a.length + 1);
    for (let i = 0; i < state.length; ++i)
        state[i] = Array(b.length + 1);

    for (let i = 1; i < state.length; ++i)
        state[i][0] = stepOf(calcValue(i), 'B', calcStepValue('B'));

    for (let j = 1; j < state[0].length; ++j)
        state[0][j] = stepOf(calcValue(j), 'A', calcStepValue('A'));

    state[0][0] = stepOf(0, '', calcStepValue(''));

    return state;
}

function stepOf(dist: number, step: string, stepValue: string): StateEntry {
    return { value: dist, direction: step, tracebackValue: stepValue};
}

export function newStep(c: StateTransitionCandidate): StateEntry {
    return { value: c.value, direction: c.step, tracebackValue: c.tracebackValue};
}

export function printState(state: StateEntry[][], a:string, b:string) {
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
                process.stdout.write(` {${s.value},${s.direction || ' '}} `);
            }
        }
    }
}

export function reconstructPath(state: StateEntry[][], a: string, b: string) {
    // printState(state, a, b);

    let path = '';
    let i = state.length - 1;
    let j = state[0].length - 1;

    do {
        const s = state[i][j];
        path = s.tracebackValue + path;

        switch (s.direction) {
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
