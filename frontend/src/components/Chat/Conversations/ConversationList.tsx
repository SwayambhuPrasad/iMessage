import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationModal from "./Modal/Modal";
import { useState } from "react";
import { ConversationPopulated } from "@/../backend/util/types";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
}

const ConversationList: React.FunctionComponent<ConversationListProps> = ({
  session,
  conversations,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClosed = () => {
    setIsOpen(false);
  };
  return (
    <Box width={"100%"}>
      <Box
        py={2}
        px={4}
        mb={4}
        bg={"blackAlpha.300"}
        cursor={"pointer"}
        onClick={() => {
          onOpen();
        }}
      >
        <Text textAlign={"center"} color={"whiteAlpha.800"} fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClosed} />
      {conversations.map((conversation) => (
        <ConversationItem conversation={conversation} key={conversation.id} />
      ))}
    </Box>
  );
};

export default ConversationList;
