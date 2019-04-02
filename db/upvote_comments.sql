update comments 
set comment_upvotes = comment_upvotes +1
where comment_id = $1;

select * from comments
where room_id = $2;