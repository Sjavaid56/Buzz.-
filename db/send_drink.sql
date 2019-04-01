insert into drinks(recipient_id,recipient_name,drink_description,coupon_code,sender_name,sender_id)
values($1,$2,$3,$4,$5,$6);

select * from drinks
where recipient_id = $1;