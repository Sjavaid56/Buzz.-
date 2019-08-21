const axios = require('axios')

module.exports = {
    getComments: (fakeDb) => {
        return fakeDb.query('select * from comments where room_id = 1')
    },

    createBusiness: (fakeDb, business) => {
        return fakeDb.query('insert into rooms(business_name, business_type, latitude, longitude) values(${business_name}, ${business_type}, ${latitude}, ${longitude}) returning *;', {
            business_name: business.business_name,
            business_type: business.business_type,
            latitude: business.latitude,
            longitude: business.longitude
        })
    },

    createBusiness2: (fakeDb, business) => {
        return fakeDb.query('insert into rooms(business_name, business_type, latitude, longitude) values(${business_name}, ${business_type}, ${latitude}, ${longitude}) returning *;', {
            business_name: business.business_name,
            business_type: business.business_type,
            latitude: business.latitude,
            longitude: business.longitude
        })
    },

    updateUsername: (fakeDb, user) => {
        return fakeDb.query('update users set user_name = ${user_name} where user_id = ${user_id} returning *', {
            user_name: user.user_name,
            user_id: user.user_id
        })
    },

    getAdminData: (fakeDatabase) => {
        return fakeDatabase.query('select * from posts left join users on(posts.poster_id = users.user_id) where room_id = 1;')
    },
    getPostsForRoom: (fakeDatabase) => {
        return fakeDatabase.query("select *,TO_CHAR(posts.time_posted :: timestamp, 'hh:mi pm') as time, TO_CHAR(posts.time_posted :: date, 'mm.dd.yy') as date from postswhere room_id = 714 order by time_posted desc;")
    },
    createUser: (db, user) => {
        return db.query('insert into users (auth0_id,email ,profile_name ,picture)values (${auth0_id},${email},${profile_name},${picture}) RETURNING *; ', {
            auth0_id: user.auth0_id,
            email: user.email,
            profile_name: user.profile_name,
            picture: user.picture
        })
    },
    getDrinksForUser: (db, user) => {
        return db.query("select * from drinks where recipient_id = ${recipient_id};", {
            recipient_id: user.recipient_id
        })
    }
}