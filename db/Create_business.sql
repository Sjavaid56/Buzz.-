insert into rooms (business_name,business_type,latitude,longitude)
values ($1,$2,$3,$4)
RETURNING *; 

