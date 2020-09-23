const supertest = require('supertest')

const server = require('../api/server')
const db = require('../data/db-connection')

beforeAll(() => {
  return db.seed.run()
})

describe('/', () => {
    describe('GET to /', () => {
        it('should return a http status code 200 when making a get request to the base url', () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a json object with a welcome message', () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.body.Welcome).toBe('to Secret Family Recipes Server')
            })
        })
    })
})