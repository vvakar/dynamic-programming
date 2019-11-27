import { LCS } from '../algos/LowestCommonSubsequence';
import {describe} from 'mocha';
import {expect} from 'chai';


describe('LCS', function() {
    it('seems to work', function(done) {
        expect(LCS('sequ', 'saqo')).to.eql(2);
        expect(LCS('subsequ', 'sabsaqo')).to.eql(4);
        expect(LCS('asubsequ', 'sabsaqo')).to.eql(4);

        expect(LCS('subsubsubsequ', 'sabsaqo')).to.eql(4);
        expect(LCS('sabsaqo', 'subsubsubsequ' )).to.eql(4);
        done();
    });

    it('more complex cases', function(done) {
        expect(LCS('subsubsubsequ', 'sabsabsabsabsaqo')).to.eql(8);
        done();
    });
});
