const request = require('supertest');
const app = require('../app.js');

const tester = request(app);

describe('routes', ()=>{
    afterAll(async()=>{
        await new Promise (resolve => setTimeout(()=> resolve(), 1000));

        })

        test('/ should return 401', (done)=>{
            request(app)
            .get('/')
            .expect(401)
            .end((err, res)=>{
                if(err)throw err;
                done()
            })
        })

        test('/ should return index', (done)=>{
            // let username = 'u1';
            // let password = '123';
            // var auth = 'Basic' + new Buffer(username + ':' + password).toString('dTE6MTIz');

            var auth = 'Basic dTE6MTIz'
            request(app)
            .get('/')
            .set("Authorization", auth)
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .end(()=>{
                done()
            })
        })
    })
