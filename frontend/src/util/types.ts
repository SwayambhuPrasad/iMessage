import {
  ConversationPopulated,
  MessagePopulated,
} from "../../../backend/util/types";
// users
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}
export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUserData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

//conversation
export interface createConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

//conversation

export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

//messages

export interface MessageData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}
