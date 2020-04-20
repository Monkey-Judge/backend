/* global describe, expect, it, afterEach */

const request = require('supertest')
const jwebt = require('jsonwebtoken')
const app = require('../app')
const truncate = require('../utils/truncate')
const userModel = require('../model/user')

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

describe('User confirmation', () => {
  afterEach(async () => {
    await truncate.truncate('users')
  })

  it('should confirm a user ', async () => {
    const user2 = {
      login: 'jose',
      email: 'jose@gmail.com',
      password: 'jose123'
    }
    var res = await request(app)
      .post('/users/register')
      .send(user2)
    expect(res.statusCode).toEqual(201)
    const usuario = userModel.findByLogin(user2.login)
    const payload = ({ id: usuario.id })
    const token = jwebt.sign(payload, process.env.JWT_KEY)
    res = await request(app)
      .post('/users/confirm')
      .send({ token: token })
    expect(res.statusCode).toEqual(202)
  })
  it('should not confirm a user ', async () => {
    const user2 = {
      login: 'joao',
      email: 'joao@gmail.com',
      password: 'joao123'
    }
    var res = await request(app)
      .post('/users/register')
      .send(user2)
    expect(res.statusCode).toEqual(201)
    const usuario = userModel.findByLogin(user2.login)
    const payload = ({ id: usuario.id })
    const token = jwebt.sign(payload, process.env.JWT_KEY)
    res = await request(app)
      .post('/users/confirm')
      .send({ token: token })
    expect(res.statusCode).toEqual(202)
    res = await request(app)
      .post('/users/confirm')
      .send({ token: token })
    expect(res.statusCode).toEqual(400)
  })
  it('should not confirm a user ', async () => {
    var res = await request(app)
      .post('/users/confirm')
    expect(res.statusCode).toEqual(400)
  })
})

describe('User login route', () => {
  afterEach(async () => {
    await truncate.truncate('users')
  })

  it('should return a error if login is not passed', () => {
    return request(app)
      .post('/users/login')
      .send({ password: 'bar123456' })
      .expect(400)
      .then(res => expect(res.body).toEqual({}))
  })

  it('should return a error if password is not passed', () => {
    return request(app)
      .post('/users/login')
      .send({ login: 'foobar' })
      .expect(400)
      .then(res => expect(res.body).toEqual({}))
  })

  it('should sign in existent user', () => {
    const user = {
      login: 'foo',
      email: 'foo@gmail.com',
      password: 'foo456'
    }

    return request(app)
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

  it('should not login/sign in a not existent user', () => {
    return request(app)
      .post('/users/login')
      .send({
        login: 'bar',
        password: 'bar123'
      })
      .expect(403)
      .then(res => expect(res).toBe({}))
  })
})
