const supertest = require('supertest')

const server = require('../api/server')
const db = require('../data/db-connection')

beforeAll(() => {
  return db.seed.run()
})

describe('authRouter', () => {
    describe('environment', () => {
        it('should havr DB_ENV as "testing"', () => {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })
    describe('POST to /auth/register', () => {
        it('should return http status code 201 when users register', () => {
            return supertest(server)
            .post('/auth/register')
            .send({ username: 'testUser1', email: 'testUser1@email.com', password: 'test' })
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return http status code 400 if user registers incorrectly', () => {
            return supertest(server)
            .post('/auth/register')
            .send({})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('username, email, and password required')
            })
        })
    })
    describe('POST to /auth/login', () => {
        it('should return http status code 200 when user logs', () => {
            return supertest(server)
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return http status code 400 if user logs in incorrectly', () => {
            return supertest(server)
            .post('/auth/login')
            .send({})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('username and password required')
            })
        })
    })  
})