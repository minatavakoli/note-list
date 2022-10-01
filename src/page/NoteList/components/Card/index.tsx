import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { Container } from "./style";
import { CardProps } from "./types";

const Card = ({ id, text, date, handleDeleteNote }: CardProps) => {
  return (
    <Container>
      <span>{text}</span>
      <Flex justifyContent="space-between" alignItems="center">
        <span>{date.toLocaleDateString()}</span>
        <DeleteIcon
          onClick={() => {
            handleDeleteNote(id);
          }}
          cursor="pointer"
        />
      </Flex>
    </Container>
  );
};

export default Card;
