const supertest = require('supertest')

const server = require('../api/server')
const db = require('../data/db-connection')

beforeAll(() => {
    return db.seed.run()
})

  describe('authRouter', () => {
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
})

describe('recipesRouter', () => {
    describe('GET to /recipes/all', () => {
        it('should return http status code 200 and array of recipes when user is authenticated and logged in', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/all')
            .set('Authorization', login.body.token)
            .then( res => {
                expect(res.status).toBe(200)
                expect(res.body.length).toBeGreaterThanOrEqual(3)
            })
           
        })
    })
    describe('GET to /recipes/all/:id', () => {
        it('should return http status code 200 and correct recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server) 
            .get('/recipes/all/1')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.id).toBe(1)
            })
        })
        it('should return http status code 404 if recipe does not exist', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server) 
            .get('/recipes/all/12')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe('recipe not found')
            })
        })
    })
})