import { Alert, Box, Stack } from "@mui/material";
import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../hooks/useCharacters";
import Loader from "../components/Loader";
import { Character } from "../types";
import Pagaination from "../components/Pagaination";
import { useEffect, useRef } from "react";

const Characters = () => {
  const { isLoading, info, results, error } = useCharacters();
  const boxRef = useRef<HTMLDivElement>();
  useEffect(() => {
    boxRef.current?.scrollIntoView();
  }, [results]);

  if (isLoading) return <Loader />;

  return (
    <Stack minHeight={"100vh"}>
      <Box ref={boxRef} sx={{ position: "relative", top: "-5rem" }}></Box>
      <Stack
        direction={"row"}
        gap={4}
        flexWrap={"wrap"}
        mt={4}
        pb={4}
        justifyContent={"center"}
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
        overflow={"scroll"}
      >
        {error && (
          <Alert severity="error">
            {error?.message || "Error fetching characters"}
          </Alert>
        )}
        {results?.map((character: Character) => {
          return <CharacterCard key={character.id} character={character} />;
        })}
      </Stack>
      {!error && (
        <Stack p={2} justifyContent={"center"} direction={"row"}>
          <Pagaination info={info} />
        </Stack>
      )}
    </Stack>
  );
};

export default Characters;
