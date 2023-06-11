import { gql } from "@apollo/client";
import { MessageFields } from "./message";
const ConversationFields = `

          id
          participants {
            user {
              id
              username
            }
            hasSeenLatestMessage
          }
          latestMessage {
            ${MessageFields}
          }
          updatedAt
        
`;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Queries: {
    conversations: gql`
      query conversations {
        conversations{
        ${ConversationFields}
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
    subscription ConversationCreated{
      conversationCreated{
        ${ConversationFields}
      }
    }
    `,
  },
};
