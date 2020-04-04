/* global describe, expect, it, afterEach */

const request = require('supertest')
const app = require('../app')
const truncate = require('../utils/truncate')

describe('User registration', () => {
  afterEach(async () => {
    await truncate.truncate('users')
  })

  it('should create a new user ', async () => {
    const user = {
      login: 'paulo',
      email: 'test@gmail.com',
      password: 'paulo123'
    }

    const res = await request(app)
      .post('/users/register')
      .send(user)
    expect(res.statusCode).toEqual(201)
  })

  it('should not create a new user', async () => {
    const user = {
      login: 'paulo',
      email: 'test@gmail.com',
      password: 'paulo123'
    }

    var res = await request(app)
      .post('/users/register')
      .send(user)
    expect(res.statusCode).toEqual(201)

    res = await request(app)
      .post('/users/register')
      .send(user)
    expect(res.statusCode).toEqual(400)
  })
})
