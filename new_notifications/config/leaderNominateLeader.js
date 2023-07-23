import NotificationTypes from "../constants/notificationTypes";
import { notificationBuilder } from "../modules/notificationHelpers";
import { updateCircleLeader } from "../modules/notificationHelpers";

const leaderNominateLeader = {
    [NotificationTypes.LEADER_NOMINATE_LEADER_USER_ACTION]: (n) => ({
        message: `${n.actor_name} is inviting you to be the new leader of ${n.circle_name}`,
        actions: {
            accept: {
                button_text: "Accept",
                dispatch: [
                    notificationBuilder(n, NotificationTypes.LEADER_NOMINATE_LEADER_USER_ACCEPTED, n.actor_id),
                    updateCircleLeader(n, n.recipient_id)
                ]
            },
            reject: {
                button_text: "Decline",
                dispatch: [
                    notificationBuilder(n, NotificationTypes.LEADER_INVITE_MEMBER_USER_REJECTION, n.actor_id)
                ]
            }
        }
    }),
    [NotificationTypes.LEADER_NOMINATE_LEADER_USER_REJECTION]: (n) => ({
        message: `${n.actor_name} is not looking to be leader of ${n.circle_name} at this time.`
    }),
    [NotificationTypes.LEADER_NOMINATE_LEADER_USER_ACCEPTED]: (n) => ({
        message: `${n.actor_name} has accepted your invitation and is now the leader of ${n.circle_name}`
    })
}

export default leaderNominateLeader;