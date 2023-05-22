import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import MessagesHeader from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({
  session,
}) => {
  const router = useRouter();

  const {
    query: { conversationId },
  } = router;
  const {
    user: { id: userId },
  } = session;
  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none" }}
      width={"100%"}
      direction={"column"}
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          direction={"column"}
          justify={"space-between"}
          overflow={"hidden"}
          flexGrow={1}
          border="1px solid red"
        >
          {/* {conversationId} */}
          <MessagesHeader userId={userId} conversationId={conversationId} />
          {/* // <Messages/>  */}
        </Flex>
      ) : (
        <div>No conversation</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
