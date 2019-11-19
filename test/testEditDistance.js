const describe = require('mocha').describe;
const editDistanceMemo = require('../algos/Levenshtein-memoize');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;


describe('edit distance behaves', function() {
    it('handles edge cases', function(done) {
        expect(editDistanceMemo('', '').distance).to.eql(0);
        expect(editDistanceMemo('', '').path).to.eql('');
        expect(editDistanceMemo('abc', '').distance).to.eql(3);
        expect(editDistanceMemo('abc', '').path).to.eql('BBB');
        expect(editDistanceMemo('', 'abc').distance).to.eql(3);
        expect(editDistanceMemo('', 'abc').path).to.eql('AAA');
        done();
    });

    it('handles short words', function(done) {
        expect(editDistanceMemo('hello', 'hello').distance).to.eql(0);
        expect(editDistanceMemo('hello', 'hello').path).to.eql('EEEEE');
        expect(editDistanceMemo('hello', 'hello1').distance).to.eql(1);
        expect(editDistanceMemo('hello', 'hello1').path).to.eql('EEEEEA');
        expect(editDistanceMemo('hello1', 'hello').distance).to.eql(1);
        expect(editDistanceMemo('hello1', 'hello').path).to.eql('EEEEEB');
        expect(editDistanceMemo('1hello1', 'hello').distance).to.eql(2);
        expect(editDistanceMemo('1hello1', 'hello').path).to.eql('BEEEEEB');

        expect(editDistanceMemo('hello', '1hello1').distance).to.eql(2);
        expect(editDistanceMemo('hello', '1hello1').path).to.eql('AEEEEEA');
        expect(editDistanceMemo('1hello', 'hello').distance).to.eql(1);
        expect(editDistanceMemo('1hello', 'hello').path).to.eql('BEEEEE');
        done();
    });

    it('handles more complex cases', function(done) {
        expect(editDistanceMemo('distnace', 'distance').distance).to.eql(2);
        expect(editDistanceMemo('diistance', 'distance').distance).to.eql(1);
        expect(editDistanceMemo('dstance', 'distance').distance).to.eql(1);
        done();
    });

    it('handles very long cases', function(done) {
        expect(editDistanceMemo('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
            'completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.').distance).to.eql(0);

        expect(editDistanceMemo('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
            'completely involved in doing hing, especially so tat you do nt notice things happning around yu. deep in conversaion: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.').distance).to.eql(10);

        expect(editDistanceMemo('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
        'The world as we have created it is a process of our thinking. ...“If I were a tree, I would have no reason to love a human.” ...“Once someones hurt you, its harder to relax around them, harder to think of them as safe to love. ...').distance).to.eql(199);

        done();
    });
});