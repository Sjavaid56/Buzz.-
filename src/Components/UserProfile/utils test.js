const utils = require("./utils")
const axios = require("axios")
const sinon = require("sinon")
const massive = require('massive')
require('dotenv').config()
const fakeDB = require('../lib/init')

describe('Unit test for distance algo', () => {

    describe('Distance', () => {
        it('Should calculate the distance between 2 lat and longs', () => {
            expect(utils.distance(33.4485494,-111.9839099, 33.4425102464302, -112.073530237354, "K")).toEqual(8.341840012222324)
        })
    })
 
 })
 describe('Unit Tests', () => {
    describe('getRooms', () => {
        it('Should fetch room data from the db', () => {
            const fakeDB = {
                query: sinon.mock().withArgs(
                    sinon.match.string
                )
            }
            return utils.getRooms(fakeDB)
        })
    })
})
describe('integration tests for posts', () =>{
    let db;
    beforeAll(() =>{
        return fakeDb.initDb().then(database =>{
          return db = database
    })      
        })
      })

describe('newPost', () => {
    it('Should create a new post', () => {
        const post = {
            poster_username: 1,
            poster_pic: 258,
            post_content: 'https://lh3.googleusercontent.com/-rJbOT76Q-qI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyxBC3VtdVUClYIN8_7eJjpnrRlQ/mo/photo.jpg',
            post_img: 'hello',
            upvotes: 1,
            downvotes:2 ,
            drinks_given: 1,
            room_id:2 ,
            poster_id:2 
        }
        return utils.createPost(db,post).then(createdPost =>{
            expect(createdPost.length).not.toEqual(0);
            expect(createdPost[0]).toMatchObject({
            post_id:expect.any(Number),
            poster_username: expect.any(Number),
            poster_pic: expect.any(Number),
            post_content: expect.any(String),
            post_img: expect.any(String),
            upvotes: expect.any(Number),
            downvotes: expect.any(Number),
            drinks_given: expect.any(Number),
            room_id: expect.any(Number),
            poster_id:expect.any(Number),
               
            });
        })
    })
})

describe('SendDrinks', () => {
    it('This should send drinks', () => {
        const post = {
            recipient_id:1 ,
            recipient_name:"shawn",
            drink_description:"roofies",
            coupon_code:333,
            sender_name:"zach",
            sender_id:2
        }
        return utils.sendDrink(db,post).then(createdPost =>{
            expect(createdPost.length).not.toEqual(0);
            expect(createdPost[0]).toMatchObject({
                recipient_id: expect.any(Number),
                recipient_name: expect.any(String),
                drink_description: expect.any(String),
                coupon_code: expect.any(Number),
                sender_name:  expect.any(String), 
                sender_id: expect.any(Number)
            });
        })
    })
})


