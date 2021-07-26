const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);

const AuthChallenger = (username, password, callback)=>{
  knex('users').then((users)=>{
    for (let user of users){
      if(user.user_name == username && user.password == password){
        return callback(null, true);
      } 
    }
    return callback(null, false);
  })
}
module.exports = AuthChallenger;