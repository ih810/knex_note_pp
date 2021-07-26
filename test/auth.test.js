const users = {
    username: 'password',
    password: '1234'
};

describe('Auth Challenger', () => {
    const authChallenger = require('../utils/auth')(users);
    
    test('returns false for incorrect username and password', function() {
        expect(authChallenger('incorrect', 'password')).toBe(false);
    });

    test('returns false for null username and password', function() {
        expect(authChallenger(null, null)).toBe(false);
    });

    test('returns false for undefined username and password', function() {
        expect(authChallenger()).toBe(false);
    });

    test('returns false for correct username and incorrect password', function() {
        expect(authChallenger('username', 'username')).toBe(false);
    });

    test('returns false for incorrect username and correct password', function() {
        expect(authChallenger('incorrect', users['test1'])).toBe(false);
    });

    test('returns true for correct username and correct password', function() {
        expect(authChallenger('username', users['username'])).toBe(true);
    });
//=====
//=====
//=====
    test('returns true if the input is typed', ()=>{
        expect(authChallenger('username', 'password')).toBe(true);
    })

    test('returns false if the input data type is incorrect', ()=>{
        expect(authChallenger('password', 1234)).toBe(false);
    })
});