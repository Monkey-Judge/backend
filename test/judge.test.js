/* global test, expect */

const judge = require('../model/judge')

test('correctRegister', () => {
  const jud = {
    name: 'codeforces',
    url: 'http://www.codeforces.com.br'
  }

  return judge.register(jud)
    .then((id) => judge.erase(id))
    .catch((error) => expect(error).toBe(null))
})

test('sameJudge', () => {
  const jud = {
    name: 'codeforces',
    url: 'http://www.codeforces.com.br'
  }

  return judge.register(jud)
    .then((id) => {
      judge.register(jud)
        .then((id1) => {
          judge.erase(id1)
        }).catch((error) => {
          judge.erase(id)
          expect(error).not.toBe(null)
        })
    })
    .catch((error) => expect(error).toBe(null))
})

test('findById', () => {
  const jud = {
    name: 'codeforces',
    url: 'http://www.codeforces.com.br'
  }

  return judge.register(jud)
    .then((id) => judge.findById(id)
      .then((jud) => expect(jud.id).toBe(id))
      .then(() => judge.erase(id))
      .catch((error) => expect(error).toBe(null))
    )
    .catch((error) => expect(error).toBe(null))
})
