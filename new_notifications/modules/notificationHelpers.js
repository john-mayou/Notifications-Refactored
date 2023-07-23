// Notification constructor
export const notificationBuilder = (n, type, recipient_id, config={}) => ({
    type: "CREATE_NEW_NOTIFICATION",
    payload: {
        type: type,
        recipient_id: recipient_id,
        circle_id: n.circle_id,
        ...config
    }
})

export const updateCircleLeader = (n, new_leader) => ({
    type: "UPDATE_NEW_CIRCLE_LEADER",
    payload: {
        new_leader: new_leader,
        circle_id: n.circle_id,
    },
})

export const addUserToCircle = (n, user_id) => ({
    type: "ADD_USER_TO_CIRCLE",
    payload: { 
        user_id: user_id, 
        circle_id: n.circle_id 
    },
})
