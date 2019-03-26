create table posts(
post_id serial primary key
,poster_username varchar(64)
,poster_pic text
,time_posted timestamp default current_timestamp
,post_content text
,post_img text
,upvotes integer
,downvotes integer
,drinks_given integer
,room_id integer);

create table users(
   user_id serial primary key,
   auth0_id varchar,
   full_name varchar(64),
   user_name varchar(64),
   profile_picture text,
   user_email varchar (64));

create table comments(
comment_id serial primary key
,post_id integer references posts(post_id)
,commenter_user_name varchar(64)
,comment_content varchar(64)
,comment_upvotes integer
,comment_downvotes integer
,commenter_img text
,room_id integer);

create table rooms(
room_id serial primary key
,buisness_name text
,buisness_type text
,latitude integer
,longitude integer
,number_of_users integer);