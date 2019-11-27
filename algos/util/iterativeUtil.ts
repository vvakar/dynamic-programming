

export interface StateEntry {
    readonly value: number;
    readonly step: string;
}

export interface StateEntryCandidate {
    readonly newValue: number;
    readonly lastStep: string;
    readonly nextStep: string;
    readonly isBoth: boolean;
}

export function newStepCandidate(value: number, step: string, prevStep: string, isBoth: boolean): StateEntryCandidate { return { newValue: value, nextStep: step, lastStep: prevStep, isBoth: isBoth}; }

export function sortFun(a: StateEntryCandidate, b: StateEntryCandidate) {
    let comp = a.newValue < b.newValue ? -1 : a.newValue === b.newValue ? 0 : 1;
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




// export function initState(x: number, y: number): number[][] {
//     const state = [];
//     for (let i = 0; i<x; ++i)
//         state[i] = [0];
//
//     for (let j = 0; j<y; ++j)
//         state[0][j] = 0;
//
//     return state;
// }

export function initState(a: string, b: string, calcStep: (n:number) => number): StateEntry[][] {
    const state = Array(a.length + 1);
    for (let i = 0; i < state.length; ++i)
        state[i] = Array(b.length + 1);

    for (let i = 1; i < state.length; ++i)
        state[i][0] = newStep(calcStep(i), 'B');

    for (let j = 1; j < state[0].length; ++j)
        state[0][j] = newStep(calcStep(j), 'A');

    state[0][0] = newStep(0, '');

    return state;
}

export function newStep(dist: number, step: string): StateEntry { return { value: dist, step: step}; }

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
                process.stdout.write(` {${s.value},${s.step || ' '}} `);
            }
        }
    }
}
