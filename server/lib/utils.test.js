const sinon = require("sinon")
const utils = require("./utils")
const testDb = require('../test/init')
// const auth = require("./auth")
// const axios = require("axios")

describe('Unit Tests: DB Queries', () => {

    describe('getComments', () => {

        it('should send out select * from comments where room_id = 1;', () => {
            const fakeDb = {
                query: sinon.mock().withArgs(
                    'select * from comments where room_id = 1'
                )
            }
            return utils.getComments(fakeDb)
        })
    })

    describe('createBusiness', () => {
        it('should create a business in rooms table', () => {
            const business = {
                business_name: 'Berdenas',
                business_type: 'Cafe',
                latitude: '33.4821032',
                longitude: '-111.9249427'
            }

            const fakeDb = {
                query: sinon.mock().withArgs(
                    'insert into rooms(business_name, business_type, latitude, longitude) values(${business_name}, ${business_type}, ${latitude}, ${longitude}) returning *;',
                    sinon.match({
                        business_name: business.business_name,
                        business_type: business.business_type,
                        latitude: business.latitude,
                        longitude: business.longitude
                    })
                )
            }
            return utils.createBusiness(fakeDb, business)
        })
    })

    describe('get admin data', () => {
        it('should get all admin data for the room number 1', () => {
            const fakeDatabase = {
                query: sinon.mock().withArgs(
                    'select * from posts left join users on(posts.poster_id = users.user_id) where room_id = 1;'
                )
            }
            return utils.getAdminData(fakeDatabase)
        })
    })

    describe('unit test to get posts in particular room', () => {
        it('should get all posts where room_id is 714', () => {
            const fakeDatabase = {
                query: sinon.mock().withArgs(
                    "select *,TO_CHAR(posts.time_posted :: timestamp, 'hh:mi pm') as time, TO_CHAR(posts.time_posted :: date, 'mm.dd.yy') as date from postswhere room_id = 714 order by time_posted desc;"
                )
            }
            return utils.getPostsForRoom(fakeDatabase)
        })
    })
})




describe('Integration tests for buzz.', () => {
    let db;

    beforeAll(() => {
        return testDb.initDb().then(database => {
            return db = database
        })
    })

    describe('createBusiness2', () => {
        it('should create a business in our db', () => {
            const business = {
                business_name: 'Berdenas',
                business_type: 'Cafe',
                latitude: '33.4821032',
                longitude: '-111.9249427'
            }
            return utils.createBusiness2(db, business).then(createdBusiness => {
                expect(createdBusiness.length).not.toEqual(0)
                expect(createdBusiness[0]).toMatchObject({
                    business_name: expect.any(String),
                    business_type: expect.any(String),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number)
                })
            })
        })
    })

    describe('updateUsername', () => {
        it('should update a user in our db', () => {
            const user = {
                user_name: 'someUsername',
                user_id: 1
            }
            return utils.updateUsername(db, user).then(updatedUser => {
                console.log('look at me', updatedUser)
                expect(updatedUser.length).not.toEqual(0)
                expect(updatedUser[0]).toMatchObject({
                    user_name: expect.any(String),
                    user_id: expect.any(Number)
                })
            })
        })
    })

    describe('create new user query', () => {
        describe('create new user', () => {
            it('should create a new user', () => {
                const user = {
                    auth0_id: 'mynameiszach',
                    email: 'zachhirschman@gmail.com',
                    profile_name: 'zdawggydog',
                    picture: 'blahh'
                }
                // console.log('inside IT', db)
                return utils.createUser(db, user).then(response => {
                    expect(response.length).not.toEqual(0)
                    expect(response[0]).toMatchObject({
                        auth0_id: expect.any(String),
                        email: expect.any(String),
                        profile_name: expect.any(String),
                        picture: expect.any(String)
                    })
                })
            })
        })
    })

    describe('Get drinks for user', () => {
        describe("get drinks for sepcific user", () => {
            it('should get all rows for user 2', () => {
                const user = {
                    recipient_id: 2
                }
                return utils.getDrinksForUser(db, user).then(response => {
                    expect(response.length).not.toEqual(0)
                    expect(response[0]).toMatchObject({
                        drink_id: expect.any(Number),
                        sender_id: expect.any(Number),
                        recipient_id: expect.any(Number)
                    })
                })
            })
        })
    })

})