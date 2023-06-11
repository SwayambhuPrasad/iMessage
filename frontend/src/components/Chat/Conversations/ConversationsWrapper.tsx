import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ConversationsData } from "@/src/util/types";
import { ConversationPopulated } from "@/../backend/util/types";
import { useEffect } from "react";
import conversation from "../../../graphql/operations/conversation";
import { useRouter } from "next/router";
import SkeletonLoader from "../../common/SkeletonLoder";

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

  const router = useRouter();
  const {
    query: { conversationId },
  } = router;
  const onViewConversation = async (conversationId: string) => {
    //push the conversationId to the router query params
    console.log(conversationId);
    router.push({ query: { conversationId } });
    //mark the conversation as read
  };
  const subscribeToNewConversation = () => {
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
        if (
          !subscriptionData.data ||
          prev.conversations.find(
            (c) => c.id === subscriptionData.data.conversationCreated.id
          )
        )
          return prev;

        const newConversations = subscriptionData.data.conversationCreated;
        return Object.assign({}, prev, {
          conversations: [newConversations, ...prev.conversations],
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
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      border={"1px solid "}
      backgroundColor={"whiteAlpha.50"}
      flexDirection={"column"}
      gap={4}
      py={6}
      px={3}
    >
      {/* seleton loder */}
      {conversationLoading ? (
        <SkeletonLoader count={7} height="80px" />
      ) : (
        <ConversationList
          session={session}
          conversations={conversationData?.conversations || []}
          onViewConversation={onViewConversation}
        />
      )}
    </Box>
  );
};

export default ConversationsWrapper;
