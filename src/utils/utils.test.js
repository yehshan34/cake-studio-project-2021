import {add} from './utils';

describe('add', () => {
    it('should return 3 if a = 1, b = 2', () => {
        const inputA = 1;
        const inputB = 2;
        expect(add(inputA, inputB)).toEqual(3);
    });
    it('should return 3 if a = 1, b = 2, c = 3', () => {
        const inputA = 1;
        const inputB = 2;
        const inputC = 3;
        expect(add(inputA, inputB, inputC)).toEqual(3);
    });
    it('should return "12" if a = "1", b="2"', () => {
        const inputA = '1';
        const inputB = '2';
        expect(add(inputA, inputB)).toEqual('12');
    });
});

describe('calCulateDate', () => {
    
});

function filterPosts() {
    return ([]);
}

describe('filter posts posted by user with uid', () => {
    it('should return empty array if theres no posts with some uid', ()=> { 
        const posts= [
            {
                title: 'AAAA',
                uid: 'a00001',
            },
            {
                title: 'AAAA',
            },
        ];
        expect(filterPosts(posts)).toEqual([]);
    });
});

//npm run test
//3 functions, 3 describes
//JEST 已被包在 Create React 裡面