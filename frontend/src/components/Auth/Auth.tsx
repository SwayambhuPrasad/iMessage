import { useMutation } from "@apollo/client";
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
import UserOperations from "../../graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/src/util/types";
import { toast } from "react-hot-toast";
interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);
  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data } = await createUsername({ variables: { username } });
      if (!data?.createUsername) {
        throw new Error();
      }
      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }
      toast.success("Username successfully created!");
      // reload session to obtain new username
      reloadSession();
    } catch (error: any) {
      toast.error(error.message);
      console.log("onSubmit error", error);
    }
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
                leftIcon={
                  <Image height="20px" src="/images/googlelogo.png" alt="" />
                }
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
