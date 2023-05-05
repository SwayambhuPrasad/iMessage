import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ConversationsData } from "@/src/util/types";

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
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
  console.log(conversationData);
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      border={"1px solid red"}
      backgroundColor={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      {/* seleton loder */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
