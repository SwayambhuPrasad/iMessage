import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      //createUsername mutation to send username to graphQL API
    } catch {}
  };
  return (
    <>
      <Center height="100vh">
        <Stack align={"center"} spacing={8}>
          {session ? (
            <>
              <Text fontSize={"3xl"}>Create a Username</Text>
              <Input
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
              <Button width={"100%"} onClick={onSubmit}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="3xl">Sandesh</Text>
              <Button
                onClick={() => signIn("google")}
                leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
              >
                Continue with Google
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </>
  );
};

export default Auth;
