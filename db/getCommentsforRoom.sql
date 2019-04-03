select *,
TO_CHAR(comments.c_time_posted :: timestamp, 'hh:mi pm') as c_time, 
TO_CHAR(comments.c_time_posted :: date, 'mm.dd.yy') as c_date from comments
where room_id = $1
order by c_time_posted desc;