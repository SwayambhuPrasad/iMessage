import { ConversationPopulated } from "@/../backend/util/types";
import { Stack, Text } from "@chakra-ui/react";

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

const ConversationItem: React.FunctionComponent<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.200" }} borderRadius={4}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;
