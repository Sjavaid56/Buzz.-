let initialState = {
    currentUser: [],
    currentRoom: 'Home',
    currentLocation:[],
    socket:""
}

const updateUser = "updateUser";
const updateRoom = 'updateRoom'
const updateCurrentLocation = "updateCurrentLocation"
const addSocket = "addSocket"

export function reducer(state = initialState, action) {
    switch (action.type) {
        case updateUser:
            return { ...state, currentUser: action.payload }
        case updateRoom:
            return { ...state, currentRoom: action.payload }
        case updateCurrentLocation:
            return {...state, currentLocation: action.payload}
        case addSocket:
            return {...state, socket:action.payload}
        default:
            return state
    }
}
export function updateSocket(socket){
    console.log("Socket in reducer: ", socket)
    return{
        type:addSocket,
        payload:socket
    }
}

export function updateCurrentUser(userInformation) {
    console.log(userInformation)
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
export function updateLocation(userLocation){
    console.log("User location:", userLocation)
    return{
        type:updateCurrentLocation,
        payload:userLocation
    }
}