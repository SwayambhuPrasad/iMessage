import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ConversationsData } from "@/src/util/types";
import { ConversationPopulated } from "@/../backend/util/types";
import { useEffect } from "react";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FunctionComponent<
  ConversationsWrapperProps
> = ({ session }) => {
  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    subscribeToMore,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);

  console.log("query data", conversationData);
  const subscribeToNewConversation = () => {
    console.log("calling subscribe");
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        console.log("Here Is SubscriptionData", subscriptionData);
        const newConversations = subscriptionData.data.conversationCreated;
        return Object.assign({}, prev, {
          conversations: [...prev.conversations, newConversations],
        });
      },
    });
  };
  useEffect(() => {
    subscribeToNewConversation();
  }, []);

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      border={"1px solid red"}
      backgroundColor={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      {/* seleton loder */}
      <ConversationList
        session={session}
        conversations={conversationData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationsWrapper;
