
exports.seed = function(knex) {
  const users = [
    {
      username: 'loveToCook82',
      email: 'loveToCook82@email.com',
      password: '$2a$08$BmdwoTN1wrQ/Mok3Urjgo.tzioOk5KhxEA2xfNwPmR59V6nKfgkll'
    },
    {
      username: 'cool-chef-94',
      email: 'cool-chef-94@email.com',
      password: '$2a$08$BmdwoTN1wrQ/Mok3Urjgo.tzioOk5KhxEA2xfNwPmR59V6nKfgkoa'
    }
  ]

  return knex('users').insert(users)
};
