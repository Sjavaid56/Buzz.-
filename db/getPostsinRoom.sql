select *,
TO_CHAR(posts.time_posted :: timestamp, 'hh:mi pm') as time, 
TO_CHAR(posts.time_posted :: date, 'mm.dd.yy') as date from posts
where room_id = $1
order by time_posted desc;