import { GraphQLError } from "graphql";
import {
  GraphQLContext,
  MessagePopulated,
  MessageSentSubscriptionPayload,
  SendMessageArguments,
} from "../../../util/types";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { userIsConversationParticipants } from "../../../util/function";
import { conversationPopulated } from "./conversation";

const resolvers = {
  Query: {
    messages: async function (
      _: any,
      args: SendMessageArguments,
      context: GraphQLContext
    ): Promise<Array<MessagePopulated>> {
      const { session, prisma } = context;
      const { conversationId } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }
      const {
        user: { id: userId },
      } = session;
      //verifay conversation exists
      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: conversationPopulated,
      });
      if (!conversation) {
        throw new GraphQLError("Conversation not found ");
      }
      // varifay the user is a participant
      const allowedtoView = userIsConversationParticipants(
        conversation.participants,
        userId
      );
      if (!allowedtoView) {
        throw new GraphQLError("Not authorized");
      }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: messagePopulated,
          orderBy: {
            createdAt: "desc",
          },
        });
        return messages;
      } catch (error: any) {
        console.log("messages error");
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    sendMessage: async function (
      _: any,
      args: SendMessageArguments,
      context: GraphQLContext
    ): Promise<boolean> {
      const { session, prisma, pubsub } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }
      const { id: userId } = session.user;
      const { id: messageId, senderId, conversationId, body } = args;

      if (userId !== senderId) {
        throw new GraphQLError("Not authorized");
      }
      try {
        //create new message entity
        const newMessage = await prisma.message.create({
          data: {
            id: messageId,
            senderId,
            conversationId,
            body,
          },
          include: messagePopulated,
        });
        //finding conversationParicipant entity
        const participant = await prisma.conversationParticipant.findFirst({
          where: {
            userId,
            conversationId,
          },
        });
        if (!participant) throw new GraphQLError("Participants don't exsists");
        //update conversation entity

        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: participant.id,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
          include: conversationPopulated,
        });

        pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });
        // pubsub.publish("CONVERSATION_UPDATED", {
        //   conversationUpdated: { conversation },
        // });
      } catch (error: any) {
        console.log("send message error");
        throw new GraphQLError("Error sending message", error.message);
      }
      return true;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;
          return pubsub.asyncIterator("MESSAGE_SENT");
        },
        (
          payload: MessageSentSubscriptionPayload,
          args: { conversationId: string },
          context: GraphQLContext
        ) => {
          return payload.messageSent.conversationId === args.conversationId;
        }
      ),
    },
  },
};
export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});

export default resolvers;
