insert into users (user_lat, user_lng)
values ($1,$2) 
where user_id = $3;
-- returning *;

