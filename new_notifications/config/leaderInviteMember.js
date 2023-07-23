import NotificationTypes from "../constants/notificationTypes";
import { notificationBuilder } from "../modules/notificationHelpers";
import { addUserToCircle } from "../modules/notificationHelpers";

const leaderInviteMember = {
    [NotificationTypes.LEADER_INVITE_MEMBER_USER_ACTION]: (n) => ({
        message: `${n.actor_name} is inviting you to join ${n.circle_name}!`,
        actions: {
            accept: {
                button_text: "Join",
                dispatch: [
                    notificationBuilder(n, NotificationTypes.LEADER_INVITE_MEMBER_USER_ACCEPTED, n.actor_id),
                    addUserToCircle(n, n.recipient_id)
                ]
            },
            reject: {
                button_text: "Decline",
                dispatch: [notificationBuilder(n, NotificationTypes.LEADER_INVITE_MEMBER_USER_REJECTION, n.actor_id)]
            }
        }
    }),
    [NotificationTypes.LEADER_INVITE_MEMBER_USER_REJECTION]: (n) => ({ 
        message: `${n.actor_name} is not looking to join ${n.circle_name} during this time.` 
    }),
    [NotificationTypes.LEADER_INVITE_MEMBER_USER_ACCEPTED]: (n) => ({ 
        message: `${n.actor_name} has accepted and is now a part of ${n.circle_name}!` 
    })
}

export default leaderInviteMember;