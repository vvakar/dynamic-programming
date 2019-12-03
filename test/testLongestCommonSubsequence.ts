import  LCS from '../algos/LongestCommonSubsequence';
import {describe} from 'mocha';
import {expect} from 'chai';


describe('LCS', function() {
    it('seems to work', function(done) {
        expect(LCS('sequ', 'saqo').value).to.eql(2);
        expect(LCS('sequ', 'saqo').path).to.eql('sq');
        expect(LCS('subsequ', 'sabsaqo').value).to.eql(4);
        expect(LCS('subsequ', 'sabsaqo').path).to.eql('sbsq');
        expect(LCS('asubsequ', 'sabsaqo').value).to.eql(4);
        expect(LCS('asubsequ', 'sabsaqo').path).to.eql('sbsq');

        expect(LCS('subsubsubsequ', 'sabsaqo').value).to.eql(4);
        expect(LCS('subsubsubsequ', 'sabsaqo').path).to.eql('sbsq');
        expect(LCS('sabsaqo', 'subsubsubsequ' ).value).to.eql(4);
        expect(LCS('sabsaqo', 'subsubsubsequ' ).path).to.eql('sbsq');
        done();
    });

    it('more complex cases', function(done) {
        expect(LCS('subsubsubsequ', 'sabsabsabsabsaqo').value).to.eql(8);
        done();
    });
});
