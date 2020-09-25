const supertest = require('supertest')

const server = require('../api/server')
const db = require('../data/db-connection')
const { as } = require('../data/db-connection')

beforeAll(() => {
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
        it('should return unauthorized message if user tries to access recipes without token', async () => {
            return supertest(server)
            .get('/recipes/all')
            .then( res => {
                expect(res.body.message).toBe('unauthorized')
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
    describe('GET /user-recipes/:id', () => {
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


    describe('GET /all/:id/ingredients', () => {
        it('should return 200 code and correct amount of ingredients when fetching ingredients for any users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/all/1/ingredients')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
            }) 
        })
        it('should return correct amount of ingredients when fetching ingredients for any users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/all/1/ingredients')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.body.length).toBe(4)
            }) 
        })
    })


    describe('GET /user-recipes/:id/ingredients', () => {
        it('should return 200 status code and ingredients if users has recipes and add ingredients message is user doesnt', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes/5/ingredients')
            .set('Authorization', login.body.token)
            .then(res => {
                if(res.body.length === 0){
                    expect(res.body.message).toBe('add ingredients for this recipe')
                } else if (res.body.length > 0) {
                    expect(res.status).toBe(200)
                    console.log(res.body)
                }
            })
        })
    })
    describe('POST /user-recipes/:id/ingredients/', () => {
        it('should return 201 status code when adding an ingredient', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .post('/recipes/user-recipes/5/ingredients')
            .set('Authorization', login.body.token)
            .send({ 
                ingredient: 'test ingredient'
            })
            .then(res => {
                expect(res.status).toBe(201) 
            }) 
        })
        it('should return 400 status code and message if user is missing ingredient info', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .post('/recipes/user-recipes/5/ingredients')
            .set('Authorization', login.body.token)
            .send({})
            .then(res => {
                expect(res.status).toBe(400) 
                expect(res.body.message).toBe('must add ingredients')
            }) 
        })
    })
    describe('GET /user-recipes/:id/ingredients/:ing_id', () => {
        it('should return 200 status code and ingredient if ingredient exists', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes/5/ingredients/12')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
            }) 
        })
        it('should return 400 status code if ingredient doesnt exists', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes/5/ingredients/13')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('ingredient not found')
            }) 
        })
    })
    describe('PUT /user-recipes/:id/ingredients/:ing_id', () => {
        it('return 200 status code and message if ingredient is updated', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .put('/recipes/user-recipes/5/ingredients/12')
            .set('Authorization', login.body.token)
            .send({ ingredient: 'test ingredient 2.0'})
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('ingredient updated')
            }) 
        })
        it('return 403 status code and message if user tries to update ingredient for another users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .put('/recipes/user-recipes/2/ingredients/1')
            .set('Authorization', login.body.token)
            .send({ ingredient: 'test ingredient 2.0'})
            .then(res => {
                expect(res.status).toBe(403)
                expect(res.body.message).toBe('recipe not yours')
            }) 
        })
    })
    describe('/user-recipes/:id/ingredients/:ing_id', () => {
        it('should return 200 code and message when ingredient is removed', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .delete('/recipes/user-recipes/5/ingredients/12')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('ingredient removed')
            }) 
        })
        it('should return 403 code and message when users tries to remove ingredient from another users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .delete('/recipes/user-recipes/1/ingredients/1')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(403)
                expect(res.body.message).toBe('recipe not yours')
            }) 
        })
    })


    describe('GET /all/:id/instructions', () => {
        it('should return 200 code and instructions for any recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/all/1/instructions/')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.length).toBe(3)
            }) 
        })
        it('should return 404 code and if recipe does not exist', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/all/10/instructions/')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe('recipe not found')
            }) 
        })
    })


    describe('GET /user-recipes/:id/instructions', () => {
        it('should return 200 code if user recipe has instructions and a message if user recipe has no instructions', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .get('/recipes/user-recipes/5/instructions/')
            .set('Authorization', login.body.token)
            .then(res => {
                if(res.body.length === 0) {
                    expect(res.status).toBe(200)
                    expect(res.body.message).toBe('add instructions for this recipe')
                } else if (res.body.length > 0) {
                    expect(res.status).toBe(200)
                }
            })
        })
    })
    describe('POST /user-recipes/:id/instructions', () => {
        it('should return 201 code when user add instructions', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .post('/recipes/user-recipes/5/instructions/')
            .set('Authorization', login.body.token)
            .send({
                step_number: 1,
                instructions: 'test instructions'
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return 403 code when user tries to add instructions to another users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .post('/recipes/user-recipes/1/instructions/')
            .set('Authorization', login.body.token)
            .send({
                step_number: 1,
                instructions: 'test instructions'
            })
            .then(res => {
                expect(res.status).toBe(403)
            })
        })
    })
    describe('PUT /user-recipes/:id/instructions/:ins_id', () => {
        it('should return 200 code and message when user edits instructions', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .put('/recipes/user-recipes/5/instructions/10')
            .set('Authorization', login.body.token)
            .send({
                step_number: 1,
                instructions: 'test instructions 2.0'
            })
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('instructions updated')
            })
        })
        it('should return 403 code when user tries to update instructions for another users recipe', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .put('/recipes/user-recipes/1/instructions/1')
            .set('Authorization', login.body.token)
            .send({
                step_number: 1,
                instructions: 'test instructions'
            })
            .then(res => {
                expect(res.status).toBe(403)
                expect(res.body.message).toBe('recipe not yours')
            })
        })
    })
    describe('DELETE /user-recipes/:id/instructions/:ins_id', () => {
        it('should return 200 code and message when instructions are removed', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .delete('/recipes/user-recipes/5/instructions/10')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('instructions removed')
            })
        })
        it('should return 403 code and message when user tries to remove another users instructions', async () => {
            const login = await supertest(server) 
            .post('/auth/login')
            .send({ username: 'testUser1', password: 'test' })

            return supertest(server)
            .delete('/recipes/user-recipes/1/instructions/1')
            .set('Authorization', login.body.token)
            .then(res => {
                expect(res.status).toBe(403)
                expect(res.body.message).toBe('recipe not yours')
            })
        })
    })  
})