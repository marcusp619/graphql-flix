exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("content")
    .del()
    .then(() => knex("users").del())

    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex("users")
          .insert({ email: "myfakeemail@email.com" }, "id")
          .then(user => {
            return knex("content").insert([
              { contentID: user[0], movieID: "399579" },
              { contentID: user[0], movieID: "490132" }
            ]);
          })
          .then(() => console.log("Seeding complete!"))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
