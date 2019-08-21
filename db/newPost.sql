set TimeZone to 'MST';
insert into posts(poster_username,poster_pic,post_content,post_img,upvotes,downvotes,drinks_given,room_id,poster_id)
values($1,$2,$3,$4,$5,$6,$7,$8,$9);
select * from posts
    where room_id = $8
order by time_posted desc;