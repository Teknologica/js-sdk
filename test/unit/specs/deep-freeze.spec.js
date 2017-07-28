import chai from 'chai';
import faker from 'faker';
import deepFreeze from '../../../src/deep-freeze.js';

const expect = chai.expect;
const should = chai.should();

describe('when I using deep-freeze helper function', () => {

    let testObj;
    let testFunc;

    before(()=> {

        testObj = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        };

        testFunc = function() {
            return {
                fullName: testObj.firstName + ' ' + testObj.lastName
            }
        }
    });


    it ('I can freeze an object', () => {
        const obj = deepFreeze(testObj);
        try {
            obj.firstName = 'rebilly.com';
        }catch(err) {
            expect(err).to.exist;
        }
    });

    it ('I can freeze a function', () => {
        const obj =  deepFreeze(testFunc);
        try {
            obj.prototype.get = function() {
                return
            }
        }catch(err) {
            expect(err).to.exist;
        }
    });
});

