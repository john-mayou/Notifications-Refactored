import NotificationTypes from "../constants/notificationTypes";
import { notificationBuilder } from "../modules/notificationHelpers";
import { addUserToCircle } from "../modules/notificationHelpers";

const requestToJoin = {
    [NotificationTypes.REQUEST_TO_JOIN_LEADER_ACTION]: (n) => ({
        message: `${n.actor_name} wants to join ${n.circle_name}!`,
        actions: {
            accept: {
                button_text: "Accept",
                dispatch: [
                    notificationBuilder(n, NotificationTypes.REQUEST_TO_JOIN_LEADER_ACCEPTED, n.actor_id),
                    addUserToCircle(n, n.actor_id)
                ]
            },
            reject: {
                button_text: "Decline",
                dispatch: [notificationBuilder(n, NotificationTypes.REQUEST_TO_JOIN_LEADER_REJECTION, n.actor_id)]
            }
        }
    }),
    [NotificationTypes.REQUEST_TO_JOIN_LEADER_REJECTION]: (n) => ({ 
        message: `${n.circle_name} is not looking for any new members at this time.` 
    }),
    [NotificationTypes.REQUEST_TO_JOIN_LEADER_ACCEPTED]: (n) => ({ 
        message: `You are now a member of ${n.circle_name}!` 
    })
}

export default requestToJoin;