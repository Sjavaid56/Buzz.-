Utils.js

 axios = require('axios')
module.exports = {
    distance(lat1, lon1, lat2, lon2, unit){
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var radlon1 = Math.PI * lon1 / 180
        var radlon2 = Math.PI * lon2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == 'K') { dist = dist * 1.609344 }
        if (unit == 'N') { dist = dist * 0.8684 }
        return dist
    },
    getRooms: (db) => {
        return db.query("select * from rooms")
    },
    createPost:(db,post) =>{
        return db.query('insert into posts(poster_username,poster_pic,post_content,post_img,upvotes,downvotes,drinks_given,room_id,poster_id values (${poster_username},${poster_pic},${post_content},${post_img},${upvotes},${downvotes},${drinks_given},${room_id},${poster_id})RETURNING *; ',
        {
            poster_username: post.poster_username,
            poster_pic: post.poster_pic,
            post_content: post.post_content,
            post_img: post.post_img,
            upvotes: post.upvotes,
            downvotes:post.downvotes,
            drinks_given: post.drinks_given,
            room_id: post.room_id,
            poster_id: post.poster_id
        })
    },
    sendDrink:(db,post) =>{
        return db.query('insert into posts(poster_username,poster_pic,post_content,post_img,upvotes,downvotes,drinks_given,room_id,poster_id values (${poster_username},${poster_pic},${post_content},${post_img},${upvotes},${downvotes},${drinks_given},${room_id},${poster_id})RETURNING *; ',
        {
            recipient_id: post.recipient_id ,
            recipient_name: post.recipent_name,
            drink_description: post.drink_description,
            coupon_code: post.coupon_code,
            sender_name: post.sender_name,
            sender_id: post.sender_id
        })
    }
}
