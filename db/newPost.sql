insert into posts(poster_username,poster_pic,post_content,post_img,upvotes,downvotes,drinks_given,room_id)
values($1,$2,$3,$4,$5,$6,$7,$8);
select * from posts
order by time_posted desc;