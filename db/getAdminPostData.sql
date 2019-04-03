select * from posts 
left join users on(posts.poster_id = users.user_id) 
where room_id = $1;