import { Prisma, PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";
import {
  conversationPopulated,
  participantPopuplated,
} from "../src/graphql/resolvers/conversation";
import { messagePopulated } from "../src/graphql/resolvers/message";
import { Context } from "graphql-ws/lib/server";
import { PubSub } from "graphql-subscriptions";
import { type } from "os";

//Server configuration
export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}
export interface Session {
  user: User;
  expires: ISODateString;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

//user releted interface
export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  emailVerified: boolean;
  name: string;
}
export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}
//conevrsation

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopuplated;
}>;

//Messages

export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}
export interface MessageSentSubscriptionPayload {
  messageSent: MessagePopulated;
}
export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;
