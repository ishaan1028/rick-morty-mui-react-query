import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { FilterType, Mode, ThemeColor } from "../types";
import { Button, ButtonGroup, IconButton, Stack } from "@mui/material";
import { teal, deepPurple, deepOrange } from "@mui/material/colors";
import { DarkMode, LightMode } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    minWidth: 400,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function Header({
  setColorIndex,
  setMode,
  mode,
}: {
  setColorIndex: React.Dispatch<React.SetStateAction<number>>;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  mode: Mode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = React.useState<string>(
    searchParams.get("name") || ""
  );

  useEffect(() => {
    setSearchTerm(searchParams.get("name") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm) {
      searchParams.delete("name");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("name", searchTerm);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
    const urlParams = new URLSearchParams();
    urlParams.set(FilterType.PAGE, "1");
    setSearchParams(urlParams);
  };

  const handleColorChange = (number: ThemeColor) => {
    setColorIndex(number);
  };
  const handleModeChange = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
      >
        <Toolbar>
          <Stack
            alignItems="center"
            sx={{
              flexGrow: 1,
            }}
            direction={{ sm: "row" }}
          >
            <Typography
              onClick={handleRedirect}
              variant="h6"
              noWrap
              component="div"
              mr={4}
              sx={{
                flexShrink: 0,
                cursor: "pointer",
              }}
              fontSize={{ sm: 20, xs: 12 }}
            >
              RICK MORTY API
            </Typography>
            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              sx={{ mr: 4 }}
            >
              <Button
                onClick={() => handleColorChange(ThemeColor.TEAL)}
                sx={{
                  backgroundColor: teal[500],
                  width: 24,
                  height: { sm: 24, md: 30 },
                }}
              ></Button>
              <Button
                onClick={() => handleColorChange(ThemeColor.PURPLE)}
                sx={{
                  backgroundColor: deepPurple[500],
                  width: 24,
                  height: { sm: 24, md: 30 },
                }}
              ></Button>
              <Button
                onClick={() => handleColorChange(ThemeColor.ORANGE)}
                sx={{
                  backgroundColor: deepOrange[500],
                  width: 24,
                  height: { sm: 24, md: 30 },
                }}
              ></Button>
            </ButtonGroup>
            <IconButton onClick={handleModeChange} sx={{ color: "white" }}>
              {mode === "light" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
