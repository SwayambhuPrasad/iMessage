import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({
  session,
}) => {
  const router = useRouter();

  const [conversationId] = Object.keys(router.query);
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none" }}
      width={"100%"}
      direction={"column"}
    >
      {conversationId ? (
        <Flex>{conversationId}</Flex>
      ) : (
        <div>No conversation</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
