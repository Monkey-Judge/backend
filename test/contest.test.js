/* global test, expect */

const contest = require('../model/contest')

test('correctRegister', () => {
  const cont = {
    begin: new Date(),
    duration: 5 * 1000 * 60,
    name: 'neerc2023',
    description: 'cool contest'
  }

  return contest.register(cont)
    .then((id) => contest.erase(id))
    .catch((error) => expect(error).toBe(null))
})

test('findById', () => {
  const cont = {
    begin: new Date(),
    duration: 5 * 1000 * 60,
    name: 'nierrc2123',
    description: 'bad contest'
  }

  return contest.register(cont)
    .then((id) => contest.findById(id)
      .then((cont) => expect(cont.id).toBe(id))
      .then(() => contest.erase(id))
      .catch((error) => expect(error).toBe(null))
    )
    .catch((error) => expect(error).toBe(null))
})
