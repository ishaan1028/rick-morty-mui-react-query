import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterType, OptionType } from "../types";

const allOption: OptionType = {
  label: "All",
  value: "all",
};

const statusOptions: Array<OptionType> = [
  {
    label: "Alive",
    value: "alive",
  },
  {
    label: "Dead",
    value: "dead",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

const genderOptions: Array<OptionType> = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Genderless",
    value: "genderless",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

const speciesOptions: Array<OptionType> = [
  { label: "Human", value: "human" },
  { label: "Alien", value: "alien" },
  { label: "Humanoid", value: "humanoid" },
  { label: "Robot", value: "robot" },
  { label: "Animal", value: "animal" },
  { label: "Cronenberg", value: "cronenberg" },
  { label: "Disease", value: "disease" },
  { label: "Parasite", value: "parasite" },
  { label: "Poopybutthole", value: "poopybutthole" },
  { label: "Vampire", value: "vampire" },
  { label: "Unknown", value: "unknown" },
  { label: "Planet", value: "planet" },
];

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = React.useState<string>(
    searchParams.get(FilterType.STATUS) || allOption.value
  );
  const [gender, setGender] = React.useState<string>(
    searchParams.get(FilterType.GENDER) || allOption.value
  );
  const [species, setSpecies] = React.useState<string>(
    searchParams.get(FilterType.SPECIES) || allOption.value
  );

  useEffect(() => {
    const filterSetter = (
      type: string,
      value: string | null,
      options: Array<OptionType>,
      setterFn: (value: React.SetStateAction<string>) => void
    ) => {
      if (
        !value ||
        value === allOption.value ||
        !options.find((s) => s.value === value)
      ) {
        searchParams.delete(type);
        setSearchParams(searchParams);
        setterFn(allOption.value);
      } else {
        setterFn(value || allOption.value);
      }
    };

    const statusParamValue = searchParams.get(FilterType.STATUS);
    const genderParamValue = searchParams.get(FilterType.GENDER);
    const speciesParamValue = searchParams.get(FilterType.SPECIES);
    filterSetter(FilterType.GENDER, genderParamValue, genderOptions, setGender);
    filterSetter(FilterType.STATUS, statusParamValue, statusOptions, setStatus);
    filterSetter(
      FilterType.SPECIES,
      speciesParamValue,
      speciesOptions,
      setSpecies
    );
  }, [searchParams, setSearchParams]);

  const changeSetter = (
    setterFn: (value: React.SetStateAction<string>) => void,
    value: string,
    type: string
  ) => {
    setterFn(value);
    searchParams.set(FilterType.PAGE, "1");
    if (value === allOption.value) {
      searchParams.delete(type);
    } else {
      searchParams.set(type, value);
    }
    setSearchParams(searchParams);
  };

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    switch (e.target.name) {
      case FilterType.STATUS:
        changeSetter(setStatus, value, FilterType.STATUS);
        return;
      case FilterType.GENDER:
        changeSetter(setGender, value, FilterType.GENDER);
        return;
      case FilterType.SPECIES:
        changeSetter(setSpecies, value, FilterType.SPECIES);
        return;
      default:
        console.error("Unhandled filter type", e.target.name);
    }
  };

  const handleReset = () => {
    searchParams.delete(FilterType.STATUS);
    searchParams.delete(FilterType.GENDER);
    searchParams.delete(FilterType.SPECIES);
    searchParams.set(FilterType.PAGE, "1");
    setSearchParams(searchParams);
    setStatus(allOption.value);
    setGender(allOption.value);
    setSpecies(allOption.value);
  };

  return (
    <Stack
      gap={1}
      p={1}
      direction={"row"}
      alignItems={"center"}
      sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })}
      flexWrap={{ sm: "nowrap", xs: "wrap" }}
      justifyContent={{ sm: "center", xs: "center" }}
    >
      <Typography
        variant="h6"
        fontSize={{ sm: 16, xs: 12 }}
        sx={(theme) => ({ color: theme.palette.primary.dark })}
      >
        FILTERS
      </Typography>
      <Stack
        flexGrow={1}
        direction={"row"}
        gap={4}
        p={1}
        flexWrap={{ sm: "nowrap", xs: "wrap" }}
      >
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            size="small"
            name={FilterType.STATUS}
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={allOption.value}>{allOption.label}</MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            size="small"
            name={FilterType.GENDER}
            value={gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value={allOption.value}>{allOption.label}</MenuItem>
            {genderOptions.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select
            size="small"
            name={FilterType.SPECIES}
            value={species}
            label="Species"
            onChange={handleChange}
          >
            <MenuItem value={allOption.value}>{allOption.label}</MenuItem>
            {speciesOptions.map((species) => (
              <MenuItem key={species.value} value={species.value}>
                {species.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button variant="outlined" onClick={handleReset}>
        <Typography variant="h6" color="inherit" fontSize={{ sm: 16, xs: 12 }}>
          Reset Filters
        </Typography>
      </Button>
    </Stack>
  );
};

export default Filters;
