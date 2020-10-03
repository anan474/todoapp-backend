const faker = require('faker')

const json = [
  {
    name: 'Coba membuat todo',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    name: 'Coba mengupdate todo',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    name: 'Coba menghapus todo',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = json
