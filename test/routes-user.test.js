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

describe('User login route', () => {
  afterEach(async () => {
    await truncate.truncate('users')
  })

  it('should sign in existent user', async () => {
    const user = {
      login: 'foo',
      email: 'foo@gmail.com',
      password: 'foo456'
    }

    request(app)
      .post('/users/register')
      .send(user)
      .then(() => request(app)
        .post('/users/login')
        .send({
          login: 'foo',
          password: 'foo456'
        })
        .expect(200)
        .expect(res => {
          if (!('token' in res.body)) {
            throw Error('missing token on response')
          }
        })
      )
  })
})
