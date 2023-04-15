import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import * as React from "react";

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <>
      Chat
      <Button onClick={() => signOut()}>Logout</Button>
    </>
  );
};

export default Chat;
