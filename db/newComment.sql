insert into comments(post_id,commenter_user_name,comment_content,comment_upvotes,comment_downvotes,commenter_img,room_id)
values($1,$2,$3,$4,$5,$6,$7);
select * from comments;