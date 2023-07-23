import requestToJoin from "./config/requestToJoin";
import memberNomination from "./config/memberNomination";
import leaderInviteMember from "./config/leaderInviteMember";
import leaderNominateLeader from "./config/leaderNominateLeader";

export default {
    ...requestToJoin,
    ...memberNomination,
    ...leaderInviteMember,
    ...leaderNominateLeader
}