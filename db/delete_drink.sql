delete from drinks where drink_id = $1;
select * from drinks where recipient_id = $2;