update comments
set comment_downvotes = comment_downvotes -1
where comment_id = $1;

select * from comments where room_id = $2;