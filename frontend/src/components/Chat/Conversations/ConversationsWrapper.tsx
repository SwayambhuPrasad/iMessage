import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FunctionComponent<
  ConversationsWrapperProps
> = ({ session }) => {
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
