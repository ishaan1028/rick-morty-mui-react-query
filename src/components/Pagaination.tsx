import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterType } from "../types";

const Pagaination = ({ info }: { info: { count: number; pages: number } }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get(FilterType.PAGE) || 1);
  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    searchParams.set(FilterType.PAGE, "" + value);
    setPage(value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setPage(searchParams.get(FilterType.PAGE) || "1");
  }, [searchParams]);

  return (
    <Pagination
      page={+page}
      count={info?.pages}
      onChange={handleChange}
      variant="outlined"
      color="primary"
      shape="rounded"
    />
  );
};

export default Pagaination;
