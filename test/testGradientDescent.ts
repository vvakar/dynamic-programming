import {describe} from 'mocha';
import  gradientDescent from '../algos/GradientDescent';
import { expect } from 'chai';


describe(`test gradient descent`, function () {
    it('happy path', function (done) {

        // actual: w0 = -1, w1 = 5
        let wHat = gradientDescent([0,1,2,3,4], [1,3,7,13,21], 0.005, 0.001);
        expect(wHat.w0).to.approximately(-1, 0.2);
        expect(wHat.w1).to.approximately(5, 0.2);
        done();
    });
});
