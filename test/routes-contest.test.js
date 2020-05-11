/* global expect, test */

const request = require('supertest')
const app = require('../app')
const taskModel = require('../model/task')
const contestModel = require('../model/contest')
const problemModel = require('../model/problem')
const truncate = require('../utils/truncate')


describe('Testing the contest routes', () => {
  afterEach(async () => {
    await truncate.truncate('problems')
    await truncate.truncate('tasks')
    await truncate.truncate('contests')
  })
  it('should test contest add task route', async () => {
    const task = {
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

    const contest = {
      begin: new Date(),
      duration: 5 * 1000 * 60,
      name: 'neerc2023',
      description: 'cool contest'
    }

    try {
      const idTask = await taskModel.register(task)
      const idContest = await contestModel.register(contest)

      expect(idTask).not.toBe(undefined)
      expect(idContest).not.toBe(undefined)
      console.log(idTask)

      const problem = {
        idTask : idTask,
        idContest : idContest
      }

      console.log(problem.idTask)
      console.log(problem.idContest)

      const res = await request(app)
        .post('/contests/task')
        .send(problem)
      expect(res.statusCode).toEqual(200)
    
    } catch (error) {
      console.log(error)
    }
  })
})