import userResolver from "./user";
import conversationResolver from "./conversation";
import merge from "lodash.merge";
import messageResolver from "./message";

const resolvers = merge(
  {},
  userResolver,
  conversationResolver,
  messageResolver
);
export default resolvers;
