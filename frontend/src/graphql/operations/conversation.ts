import { gql } from "@apollo/client";
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
            id
            sender {
              id
              username
            }
            body
            createdAt
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
