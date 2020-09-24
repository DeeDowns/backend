const supertest = require('supertest')

const server = require('../api/server')
const db = require('../data/db-connection')
const { as } = require('../data/db-connection')

afterAll(() => {
    return db.seed.run()
})

  describe('authRouter', () => {
    describe('POST to /auth/register', () => {
        it('should return http status code 201 when users register', async () => {
            await supertest(server)
            .post('/auth/register')
            .send({ username: 'testUser1', email: 'testUser1@email.com', password: 'test' })
        })
    }) 
})

describe('recipesRouter', () => {
    describe('GET to /all', () => {
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
    describe('GET to /all/:id', () => {
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
    describe('GET /user-recipes', () => {
        it('should return http status code 200 if user has recipes and 404 if user doesnt have any recipes', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes')
            .set('Authorization', login.body.token)
            .then(res => {
                console.log(res.body)
                if(res.body.length === 0) {
                    expect(res.status).toBe(404)
                    expect(res.body.message).toBe('you do not have any recipes')
                } else if (res.body.length > 0) {
                    expect(res.status).toBe(200)
                }  
            }) 
        })
    })
   
    describe('POST /user-recipes', () => {
        it('should return http status code 201 when recipe is added', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .post('/recipes/user-recipes')
            .set('Authorization', login.body.token)
            .send({ 
                title: 'test recipe',
                source: 'test source',
                image: 'test_url',
                description: 'test description',
                category: 'test category',
                user_id: 3
            })
            .then(res => {
                expect(res.status).toBe(201) 
            }) 
        })
        it('should return success message when recipe is added', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .post('/recipes/user-recipes')
            .set('Authorization', login.body.token)
            .send({ 
                title: 'test recipe 2',
                source: 'test source 2',
                image: 'test_url2',
                description: 'test description 2',
            })
            .then(res => {
                expect(res.body.message).toBe('recipe added')
            })
        })
    })
    describe('GET /user-recipes/4', () => {
        it('should return http status code 200', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes/4')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
            }) 
        })
        it('should return a users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes/4')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.body).toMatchObject({
                    id: 4,
                    title: 'test recipe',
                    source: 'test source',
                    image: 'test_url',
                    description: 'test description',
                    category: 'test category',
                    username: 'testUser1'
                })
            }) 
        })
    })
    describe('PUT /user-recipes/:id', () => {
        it('should return http status code 200 and recipe updated message when recipe is edited ', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .put('/recipes/user-recipes/4')
            .set('Authorization', login.body.token)
            .send({
                title: 'test recipe updated',
                source: 'test source',
                image: 'test_url',
                description: 'test description',
                category: 'test category',
            })
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('recipe updated')
            }) 
        })
        it('should return 404 code and recipe not found message if recipe does not exist', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .put('/recipes/user-recipes/10')
            .set('Authorization', login.body.token)
            .send({
                title: 'test recipe updated',
                source: 'test source',
                image: 'test_url',
                description: 'test description',
                category: 'test category'
            })
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe('recipe not found')
            }) 
        })
    })
    describe('DELETE /user-recipes/:id', () => {
        it('should return 200 code and recipe removed message when user recipe is deleted', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .delete('/recipes/user-recipes/4')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('recipe removed')
            }) 
        })
        it('should return 403 code and recipe not yours message when user tries to delete another users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .delete('/recipes/user-recipes/1')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(403)
                expect(res.body.message).toBe('recipe not yours')
            }) 
        })
    })
})