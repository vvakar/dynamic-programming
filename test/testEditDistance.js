const describe = require('mocha').describe;
const editDistance = require('../algos/Levenshtein-memoize');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;


describe('edit distance behaves', function() {
    it('handles edge cases', function(done) {
        expect(editDistance('', '')).to.eql(0);
        expect(editDistance('abc', '')).to.eql(3);
        expect(editDistance('', 'abc')).to.eql(3);
        done();
    });

    it('handles short words', function(done) {
        expect(editDistance('hello', 'hello')).to.eql(0);
        expect(editDistance('hello1', 'hello')).to.eql(1);
        expect(editDistance('1hello1', 'hello')).to.eql(2);
        expect(editDistance('1hello', 'hello')).to.eql(1);
        done();
    });

    it('handles more complex cases', function(done) {
        expect(editDistance('distnace', 'distance')).to.eql(2);
        expect(editDistance('diistance', 'distance')).to.eql(1);
        expect(editDistance('dstance', 'distance')).to.eql(1);
        done();
    });

    it('handles very long cases', function(done) {
        expect(editDistance('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
            'completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.')).to.eql(0);

        expect(editDistance('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
            'completely involved in doing hing, especially so tat you do nt notice things happning around yu. deep in conversaion: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.')).to.eql(10);

        expect(editDistance('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
        'The world as we have created it is a process of our thinking. ...“If I were a tree, I would have no reason to love a human.” ...“Once someones hurt you, its harder to relax around them, harder to think of them as safe to love. ...')).to.eql(199);

        done();
    });
});