insert into users (auth0_id,email ,profile_name ,picture,gender,age_range,birthday)
values ($1,$2,$3,$4,'','','')
RETURNING *; 

