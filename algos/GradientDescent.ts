export default function gradientDescent(xs: number[], ys: number[], STEP: number, tolerance: number) {

    function get_y(w0: number, w1: number, x: number) {
        return w0 + w1 * x;
    }

    /**
     * RSS is a symmetrical cost function: cost of overestimating is same as cost of underestimating.
     */
    function computeRSS(w0: number, w1: number) {
        let rss = 0;
        for (let i = 0; i < xs.length; ++i) {
            let y = get_y(w0, w1, xs[i]);
            rss += Math.pow(y - ys[i], 2);
        }
        return rss;
    }

    function euclideanLength(w0Slope: number, w1Slope: number) {
        return Math.sqrt(Math.pow(w0Slope, 2) + Math.pow(w1Slope, 2))
    }

    function w0_slope(w0: number, w1: number) {
        let sum = 0;
        for (let i = 0; i < xs.length; ++i) {
            let yHat = get_y(w0, w1, xs[i]);
            sum = sum + ys[i] - yHat;
        }
        return -2 * sum;
    }

    function w1_slope(w0: number, w1: number) {
        let sum = 0;
        for (let i = 0; i < xs.length; ++i) {
            let x = xs[i];
            let yHat = get_y(w0, w1, x);
            sum = sum + (ys[i] - yHat) * x;
        }
        return -2 * sum;
    }

    let w0 = 0;
    let w1 = 0;
    let prevRSS, rss = 9999999999;
    let iterations = 0;
    var cost = tolerance * 1000;

    do {
        console.log("Trying with w0 = " + w0 + ", w1 = " + w1);
        ++iterations;

        let w0Slope = w0_slope(w0, w1);
        let w1Slope = w1_slope(w0, w1);
        w0 = w0 - STEP * w0Slope;
        w1 = w1 - STEP * w1Slope;
        console.log(" w0Slope = " + w0Slope + ", w1Slope = " + w1Slope);

        // Cost Method 1: difference in RSS
        prevRSS = rss;
        rss = computeRSS(w0, w1);
        // cost = rss - prevRSS;

        // Cost Method 2: euclidean length
        cost = euclideanLength(w0Slope, w1Slope) ;

        console.log("new RSS = " + rss);
    } while (Math.abs(cost) > tolerance);

    console.log("\n\nSOLUTION: w0 = " + w0 + ", w1 = " + w1 + "  in " + iterations + " iterations\n\n");
    return {w0: w0, w1: w1, iterations: iterations};
}
