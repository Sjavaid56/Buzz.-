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
,business_name text
,business_type text
,latitude integer
,longitude integer
,number_of_users integer);

create table drink_deals(
    deal_id serial primary key
    ,coupon_code varchar(64)
    ,description varchar(64);
    ,room_id integer references rooms(room_id)
);

create table drinks(
    drink_id serial primary key,
    recipient_id integer,
    recipient_name varchar(64),
    drink_description varchar(64),
    coupon_code varchar(64),
    sender_name varchar(64),
    sender_id integer
    );


-- ADMIN QUERIES
-- GET POSTS AND USERS THAT HAVE POSTED IN YOUR ROOMS INFORMATION

-- select * from posts 
-- left join users on(posts.poster_id = users.user_id) 
-- where room_id = 714;

-- GET NUMBER OF DRINKS SENT IN YOUR ROOM, WHO HAS SPENT THE MOST MONEY IN YOUR ROOM
-- select * from drinks
-- join users on(drinks.sender_id = users.user_id)
-- where sent_in_room = $1;

-- WHO HAS GOTTEN THE MOST DRINKS BOUGHT FOR THEM IN YOUR ROOM?
-- WILL HAVE TO FURTHER NARROW THIS DOWN
-- select * from drinks
-- join users on(drinks.recipient_id = users.user_id);