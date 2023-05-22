import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationModal from "./Modal/Modal";
import { use, useState } from "react";
import { ConversationPopulated } from "@/../backend/util/types";
import ConversationItem from "./ConversationItem";
import { useRouter } from "next/router";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (conversationId: string) => void;
}

const ConversationList: React.FunctionComponent<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    user: { id: userId },
  } = session;
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
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          userId={userId}
          onClick={() => {
            onViewConversation(conversation.id);
          }}
          isSelected={conversation.id === router.query.conversationId}
        />
      ))}
    </Box>
  );
};

export default ConversationList;
