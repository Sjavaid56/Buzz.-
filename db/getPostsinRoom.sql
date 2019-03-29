select * from posts
where room_id = $1
order by time_posted desc;