import { SearchedUser } from "@/src/util/types";
import { Avatar, Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import * as React from "react";

interface UserSearchListPropsProps {
  users: Array<SearchedUser>;
  addParticipants: (user: SearchedUser) => void;
}

const UserSearchList: React.FunctionComponent<UserSearchListPropsProps> = ({
  users,
  addParticipants,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify={"center"}>
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user, i) => (
            <Stack
              key={i}
              direction={"row"}
              align={"center"}
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar />
              <Flex justify={"space-between"} align={"center"} width={"100%"}>
                <Text color={"whiteAlpha.700"} _hover={{ bg: "brand.100" }}>
                  {user.username}
                </Text>
                <Button
                  bg={"brand.100"}
                  onClick={() => {
                    addParticipants(user);
                  }}
                  _hover={{ bg: "brand.100" }}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
