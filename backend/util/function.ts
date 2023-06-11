import { ParticipantPopulated } from "./types";

export function userIsConversationParticipants(
  participants: Array<ParticipantPopulated>,
  userId: string
) {
  return !!participants.find((p) => p.userId === userId);
}
