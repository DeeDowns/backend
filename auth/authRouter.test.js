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
    })
    describe('POST to /auth/login', () => {
        it('should return http status code 201 when user logs', () => {
            return supertest(server)
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })  
})