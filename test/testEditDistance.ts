import {describe} from 'mocha';
import { levenshteinMemoize } from '../algos/Levenshtein-memoize';
import { levenshteinIterative} from "../algos/Levenshtein-iterative";
import { expect } from 'chai';


for (let func of [levenshteinMemoize, levenshteinIterative]) {

    describe(`${func.name} edit distance`, function () {
        it('handles edge cases', function (done) {
            expect(func('', '').value).to.eql(0);
            expect(func('', '').path).to.eql('');
            expect(func('abc', '').value).to.eql(3);
            expect(func('abc', '').path).to.eql('BBB');
            expect(func('', 'abc').value).to.eql(3);
            expect(func('', 'abc').path).to.eql('AAA');
            done();
        });

        it('handles short words', function (done) {
            expect(func('hello', 'hello').value).to.eql(0);
            expect(func('hello', 'hello').path).to.eql('EEEEE');
            expect(func('hello', 'hello1').value).to.eql(1);
            expect(func('hello', 'hello1').path).to.eql('EEEEEA');
            expect(func('hello1', 'hello').value).to.eql(1);
            expect(func('hello1', 'hello').path).to.eql('EEEEEB');
            expect(func('1hello1', 'hello').value).to.eql(2);
            expect(func('1hello1', 'hello').path).to.eql('BEEEEEB');

            expect(func('hello', '1hello1').value).to.eql(2);
            expect(func('hello', '1hello1').path).to.eql('AEEEEEA');
            expect(func('1hello', 'hello').value).to.eql(1);
            expect(func('1hello', 'hello').path).to.eql('BEEEEE');
            done();
        });

        it('handles more complex cases', function (done) {
            expect(func('distnace', 'distance').value).to.eql(2);
            expect(func('distnace', 'distance').path).to.eql('EEEEXXEE');

            expect(func('diis', 'dis').value).to.eql(1);
            expect(func('diistance', 'distance').value).to.eql(1);

            expect(func('dstance', 'distance').value).to.eql(1);
            expect(func('dstance', 'distance').path).to.eql('EAEEEEEE');
            done();
        });

        it('favors E/X over A over B', function(done) {
            expect(func('dii', 'di').path).to.eql('EEB');
            expect(func('diistance', 'distance').path).to.eql('EEBEEEEEE');
            done();
        });

        it('handles very long cases', function (done) {
            expect(func('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
                'completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.').value).to.eql(0);

            expect(func('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
                'completely involved in doing hing, especially so tat you do nt notice things happning around yu. deep in conversaion: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.').value).to.eql(10);

            expect(func('completely involved in doing something, especially so that you do not notice things happening around you. deep in conversation: Her husband seemed deep in conversation with Mrs Beeley. deep in thought: He was deep in thought, oblivious to all the noise around him.',
                'The world as we have created it is a process of our thinking. ...“If I were a tree, I would have no reason to love a human.” ...“Once someones hurt you, its harder to relax around them, harder to think of them as safe to love. ...').value).to.eql(199);

            done();
        });
    });
}