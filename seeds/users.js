
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('note').del().then(()=>{
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {user_name: 'u1', password:'123'},
          {user_name: 'u2', password:'pw'},
          {user_name: 'u3', password:'password'}
        ]);
      }).then(function () {
          // Inserts seed entries
          return knex('note').insert([
            {user_id: 1, content: 'rowValue1'},
            {user_id: 1, content: 'rowValue2'},
            {user_id: 1, content: 'rowValue3'}
          ]);
        });
      });
  };
