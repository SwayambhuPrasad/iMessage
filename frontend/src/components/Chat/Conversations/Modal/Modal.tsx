import {
  CreateConversationInput,
  SearchUserData,
  SearchUsersInput,
  SearchedUser,
  createConversationData,
} from "@/src/util/types";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConversationOparations from "../../../../graphql/operations/conversation";
import UserOparations from "../../../../graphql/operations/user";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const ConversationModal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUserData,
    SearchUsersInput
  >(UserOparations.Queries.searchUsers);

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<createConversationData, CreateConversationInput>(
      ConversationOparations.Mutations.createConversation
    );

  // console.log("searched user", data);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
  };
  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };
  const removeParticipants = (userId: string) => {
    setParticipants((p) => p.filter((pa) => pa.id !== userId));
  };

  const onCreateConversation = async () => {
    console.log("clicked");
    const participantIds = [userId, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });
      if (!data?.createConversation) throw new Error("Failed to update");

      const {
        createConversation: { conversationId },
      } = data;
      router.push({ query: conversationId });
      // clear state and close model
      //on successful creation

      setParticipants([]);
      setUsername("");
      onClose();
      console.log("here is data", data);
    } catch (e: any) {
      console.log("onCreateConversation error", error);
      toast.error(e?.message);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#2d2d2d"} pb={4}>
          <ModalHeader>Create a conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data && (
              <UserSearchList
                users={data?.searchUsers}
                addParticipants={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipants={removeParticipants}
                />
                <Button
                  bg={"brand.100"}
                  width={"100%"}
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  onClick={onCreateConversation}
                  isLoading={createConversationLoading}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
