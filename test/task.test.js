/* global test, expect */

const task = require('../model/task')
// os testes sao executados considerando que existe um registro em judge com id = 8
test('correctRegister', () => {
  const tas = {
    id_judge: 8,
    originalId: '12345',
    title: 'Rafael Birthday',
    memoryLimit: 12345,
    timeLimit: 12345,
    statement: 'You are given two integers a and b, and q queries. The i-th query ' +
    'consists of two numbers li and ri, and the answer to it is the number of inte' +
    'gers x such that lixri, and ((xmoda)modb)((xmodb)moda). Calculate the answer ' +
    'for each query.Recall that ymodz is the remainder of the division of y by z. For example, 5mod3=2, 7mod8=7, 9mod4=1,',
    input: 'The first line contains one integer t (1t100) — the number of test cases. Then the test cases follow.' +
            'The first line of each test case contains three integers a, b and q (1a,b200; 1q500).' +
            'Then q lines follow, each containing two integers li and ri (1liri1018) for the corresponding query.',
    output: 'For each test case, print q integers — the answers to the queries of this test case in the order they appear.',
    notes: 'In the second test case both integers are equal to zero initially, so you dont have to spend money.',
    pdfLink: 'www.apijudge.com.br/pdf01.pdf',
    sourceLink: 'www.judge.com.br/rafaelbirthday'
  }

  return task.register(tas)
    .then((id) => task.erase(id))
    .catch((error) => expect(error).toBe(null))
})

test('findById', () => {
  const tas = {
    id_judge: 8,
    originalId: '1234512',
    title: 'Rafael Birthday12',
    memoryLimit: 12345,
    timeLimit: 12345,
    statement: 'You are given two integers a and b, and q queries. The i-th query ' +
    'consists of two numbers li and ri, and the answer to it is the number of inte' +
    'gers x such that lixri, and ((xmoda)modb) ((xmodb)moda). Calculate the answer ' +
    'for each query.Recall that ymodz is the remainder of the division of y by z. For example, 5mod3=2, 7mod8=7, 9mod4=1,',
    input: 'The first line contains one integer t (1t100) — the number of test cases. Then the test cases follow.' +
            'The first line of each test case contains three integers a, b and q (1a,b200; 1q500).' +
            'Then q lines follow, each containing two integers li and ri (1liri1018) for the corresponding query.',
    output: 'For each test case, print q integers — the answers to the queries of this test case in the order they appear.',
    notes: 'In the second test case both integers are equal to zero initially, so you dont have to spend money.',
    pdfLink: 'www.apijudge.com.br/pdf01.pdf',
    sourceLink: 'www.judge.com.br/rafaelbirthday'
  }

  return task.register(tas)
    .then((id) => task.findById(id)
      .then((rtas) => expect(rtas.id).toBe(id))
      .then(() => task.erase(id))
      .catch((error) => expect(error).toBe(null))
    )
    .catch((error) => expect(error).toBe(null))
})
