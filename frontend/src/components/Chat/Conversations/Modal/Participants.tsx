import { SearchedUser } from "@/src/util/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipants: (userId: string) => void;
}

const Participants: React.FunctionComponent<ParticipantsProps> = ({
  participants,
  removeParticipants,
}) => {
  return (
    <>
      <Flex mt={6} gap={"10px"} flexWrap={"wrap"} width={"100%"}>
        {participants.map((participant, i) => (
          <Stack
            key={i}
            direction={"row"}
            align={"center"}
            bg={"whiteAlpha.200"}
            borderRadius={4}
            p={2}
          >
            <Text>{participant.username}</Text>
            <IoIosCloseCircleOutline
              size={20}
              cursor={"pointer"}
              onClick={() => {
                removeParticipants(participant.id);
              }}
            />
          </Stack>
        ))}
      </Flex>
    </>
  );
};

export default Participants;
