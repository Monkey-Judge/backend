/* global describe, expect, it, afterEach */

const request = require('supertest')
const app = require('../app')
const truncate = require('../utils/truncate')

describe('Contest registration', () => {
  afterEach(async () => {
    await truncate.truncateParticipants('participants')
    await truncate.truncateUsers('users')
    await truncate.truncateContests('contests')
  })

  it('should create a contest ', async () => {
    const user = {
      login: 'josee',
      email: 'josee@gmail.com',
      password: 'josee123'
    }
    const contest = {
      begin: '2020-12-12 00:00:00',
      duration: 1000,
      name: 'contest 1',
      description: 'primeiro contest'
    }
    var res = await request(app)
      .post('/users/register')
      .send(user)
    expect(res.statusCode).toEqual(201)

    res = await request(app)
      .post('/users/login')
      .send({
        login: 'josee',
        password: 'josee123'
      })
    expect(res.statusCode).toEqual(200)
    res = await request(app)
      .post('/contests/register')
      .send(contest)
      .set('Authorization', res.body.token)
    expect(res.statusCode).toEqual(201)
  })

  it('should not create a contest ', async () => {
    const contest = {
      begin: '2020-12-12 00:00:00',
      duration: 1000,
      name: 'contest 2',
      description: 'segundo contest'
    }
    var res = await request(app)
      .post('/contests/register')
      .send(contest)
    expect(res.statusCode).toEqual(401)
  })

  it('should not create a contest ', async () => {
    const user = {
      login: 'joseee',
      email: 'joseee@gmail.com',
      password: 'jose123'
    }
    const contest = {
      begin: '2020-12-12 00:00:00',
      duration: 1000,
      name: 'contest 3',
      description: 'terceiro contest'
    }
    var res = await request(app)
      .post('/users/register')
      .send(user)
    expect(res.statusCode).toEqual(201)

    res = await request(app)
      .post('/contests/register')
      .send(contest)
    expect(res.statusCode).toEqual(401)
  })
})
