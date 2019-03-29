let initialState = {
    currentUser: [],
    currentRoom: 'Home'
}

const updateUser = "updateUser";
const updateRoom = 'updateRoom'

export function reducer(state = initialState, action) {
    switch (action.type) {
        case updateUser:
            return { ...state, currentUser: action.payload }
        case updateRoom:
            return { ...state, currentRoom: action.payload }
        default:
            return state
    }
}

export function updateCurrentUser(userInformation) {
    // console.log(userInformation)
    return {
        type: updateUser,
        payload: userInformation
    }
}

export function updateCurrentRoom(roomInformation) {
    console.log(roomInformation)
    return {
        type: updateRoom,
        payload: roomInformation
    }
}