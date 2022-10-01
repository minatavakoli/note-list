import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./components/Card";
import { FormContainer } from "./components/Card/style";
import { Note } from "./components/Card/types";

const NoteListComponent = () => {
  const [noteList, setNoteList] = useState<Note[]>([
    { id: uuidv4(), text: "test", date: new Date() },
    { id: uuidv4(), text: "test", date: new Date() },
  ]);
  const [filterNoteList, setFilterNoteList] = useState<Note[]>([]);
  const [noteValue, setNoteValue] = useState("");
  const [search, setSearch] = useState("");

  const toast = useToast();
  function deleteNote(id: string) {
    const filterNoteList = noteList.filter((item) => item.id !== id);
    setNoteList(filterNoteList);
  }

  // useEffect(() => {},[noteList])

  useEffect(() => {
    const filterNoteList = noteList.filter((item) =>
      item.text.includes(search)
    );
    setFilterNoteList(filterNoteList);
  }, [search, noteList]);

  return (
    <div>
      <Box mt="40px" mx="auto" w="60%">
        <Text fontSize="3xl">Notes</Text>

        <Input
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SimpleGrid columns={2} spacing={10} mt="10px">
          {filterNoteList.map((item, i) => {
            return (
              <Card
                key={i}
                id={item.id}
                text={item.text}
                date={item.date}
                handleDeleteNote={deleteNote}
              />
            );
          })}
          <FormContainer>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              onSubmit={(e) => {
                e.preventDefault();

                if (noteValue.length === 0) {
                  toast({
                    title: "Error Validation ...",
                    description: "Please enter text...",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                  return;
                }

                setNoteList((currentValue) => [
                  ...currentValue,
                  { id: uuidv4(), text: noteValue, date: new Date() },
                ]);
                setNoteValue("");
              }}
            >
              <Textarea
                value={noteValue}
                onChange={(e) => {
                  if (e.target.value.length > 50) {
                    return;
                  }

                  setNoteValue(e.target.value);
                }}
                border="none"
                placeholder="note"
              />

              <Flex justifyContent="space-between">
                <Box display={"flex"}>
                  {50 - noteValue.length}
                  <Text mx="5px">Remaining</Text>
                </Box>
                <Button colorScheme="teal" size="xs" type="submit">
                  Save
                </Button>
              </Flex>
            </form>
          </FormContainer>
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default NoteListComponent;
