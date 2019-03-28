let initialState = {
    currentUser:[]
}

const updateUser = "updateUser"

export function reducer(state = initialState, action){
    switch(action.type){
        case updateUser:
            return {...state, currentUser:action.payload}
        default:
            return state
    }
}

export function updateCurrentUser(userInformation){
    console.log(userInformation)
    return{
        type:updateUser,
        payload:userInformation
    }
}