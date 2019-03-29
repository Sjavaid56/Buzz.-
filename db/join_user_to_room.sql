update rooms 
    set number_of_users = number_of_users + 1
    where room_id = $1;