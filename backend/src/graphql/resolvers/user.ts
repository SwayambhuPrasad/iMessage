import { User } from "@prisma/client";
import { CreateUsernameResponse, GraphQLContext } from "../../../util/types";
import { GraphQLError } from "graphql";
const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { username: searchUsername } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError("Not Authorized");
      }

      const {
        user: { username: myUsername },
      } = session;
      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (e: any) {
        console.log("Seerch user error", e);
        throw new GraphQLError(e?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;
      if (!session || !session.user) {
        return {
          error: "Not authorized",
        };
      }
      const { id: userId } = session.user;
      try {
        //check username is not taken
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (existingUser) {
          return {
            error: "Username already taken. Try another",
          };
        }
        //update user
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });
        return { success: true };
      } catch (error: any) {
        console.log("CreateUsername error", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
