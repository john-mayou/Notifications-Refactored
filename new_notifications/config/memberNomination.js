import NotificationTypes from "../constants/notificationTypes";
import { notificationBuilder } from "../modules/notificationHelpers";
import { addUserToCircle } from "../modules/notificationHelpers";

const memberNomination = {
    [NotificationTypes.MEMBER_NOMINATION_LEADER_ACTION]: (n) => ({
        message: `${n.nominated_by_name} has nominated ${n.nominated_name} to be a part of ${n.circle_name}!`,
        actions: {
            accept: {
                button_text: "Send Invite",
                dispatch: [notificationBuilder(n, NotificationTypes.MEMBER_NOMINATION_USER_ACTION, n.nominated_id, {existing_nomination_id: n.existing_nomination_id})]
            },
            reject: {
                button_text: "Decline",
                dispatch: [notificationBuilder(n, NotificationTypes.MEMBER_NOMINATION_LEADER_REJECTION, n.nominated_by_id, {existing_nomination_id: n.existing_nomination_id})]
            }
        }
    }),
    [NotificationTypes.MEMBER_NOMINATION_LEADER_REJECTION]: (n) => ({ 
        message: `Your nomination for ${n.nominated_name} has not gone through. ${n.circle_name} isn't looking any new members at this time.`, 
    }),
    [NotificationTypes.MEMBER_NOMINATION_USER_ACTION]: (n) => ({
        message: `You have been nominated by ${n.nominated_by_name} to join ${n.circle_name}!`,
        actions: {
            accept: {
                button_text: "Join",
                dispatch: [
                    notificationBuilder(n, NotificationTypes.MEMBER_NOMINATION_USER_ACCEPTED, n.actor_id, {existing_nomination_id: n.existing_nomination_id}),
                    notificationBuilder(n, NotificationTypes.MEMBER_NOMINATION_USER_ACCEPTED, n.nominated_by_id, {existing_nomination_id: n.existing_nomination_id}),
                    addUserToCircle(n, n.recipient_id)
                ]
            },
            reject: {
                button_text: "Decline",
                dispatch: [
                    notificationBuilder(n, NotificationTypes.MEMBER_NOMINATION_USER_REJECTION, n.actor_id, {existing_nomination_id: n.existing_nomination_id}),
                    notificationBuilder(n, NotificationTypes.MEMBER_NOMINATION_USER_REJECTION, n.nominated_by_id, {existing_nomination_id: n.existing_nomination_id}),
                ]
            }
        }
    }),
    [NotificationTypes.MEMBER_NOMINATION_USER_REJECTION]: (n) => ({ 
        message: `${n.actor_name} is not looking to join ${n.circle_name} at this time.` 
    }),
    [NotificationTypes.MEMBER_NOMINATION_USER_ACCEPTED]: (n) => ({ 
        message: `${n.actor_name} has accepted and is now a part of ${n.circle_name}!` 
    })
}

export default memberNomination;