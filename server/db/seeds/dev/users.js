exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('content')
    .del()
    .then(() => knex('users').del())

    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users')
          .insert(
            { UserName: 'mark619', UserEmail: 'myfakeemail@email.com' },
            'id'
          )
          .then(user => {
            return knex('content').insert([
              { title: 'Alita: Battle Angel', contentID: user[0] },
              { title: 'Green Book', contentID: user[0] }
            ]);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
